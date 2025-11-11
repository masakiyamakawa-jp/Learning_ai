# main.py
import os
from typing import Optional, List, Dict

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass
from openai import OpenAI


client = OpenAI()          # OPENAI_API_KEY を自動参照）

# FastAPIインスタンスを生成
app = FastAPI()


# CORS: 開発用(本番："https://95n3ic3jzc.ap-northeast-1.awsapprunner.com")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ====== 認証用ダミーユーザ ======
USERS: List[Dict[str, str]] = [
    {"id": "user1", "pass": "pass1"},
    {"id": "alice", "pass": "wonderland"},
    {"id": "taro", "pass": "yamada123"},
]


# ====== スキーマ群 ======
class LoginIn(BaseModel):
    user_id: str
    password: str


class LoginOut(BaseModel):
    ok: bool


class QuestionIn(BaseModel):
    name: Optional[str] = None
    topic: str


class QuestionOut(BaseModel):
    message: str


@app.get("/health")
def health():
    # キーの存在チェック
    ok = bool(os.getenv("OPENAI_API_KEY"))
    return {"status": "ok", "openai_key": ok}


# ====== 認証API ======
@app.post("/auth", response_model=LoginOut)
def auth(payload: LoginIn):
    uid = (payload.user_id or "").strip()
    pw = (payload.password or "").strip()
    if not uid or not pw:
        raise HTTPException(status_code=400, detail="user_id と password は必須です。")

    hit = next((u for u in USERS if u["id"] == uid and u["pass"] == pw), None)
    if not hit:
        # 認証失敗
        raise HTTPException(status_code=401, detail="ID またはパスワードが違います。")
    # 認証成功
    return {"ok": True}


# ====== 質問システムAPI ======
@app.post("/question", response_model=QuestionOut)
def post_question(payload: QuestionIn):
    """
    React 側のフォームから { name, topic } を受け取り、
    OpenAI へ問い合わせた回答文を { message } で返す。
    """
    if not payload.topic or not payload.topic.strip():
        raise HTTPException(status_code=400, detail="topic は必須です。")

    # プロンプトスキーマ
    user_name = payload.name or "ユーザー"
    prompt = (
        f"{user_name}さんからの相談:\n"
        f"{payload.topic.strip()}\n\n"
        "ステップを箇条書きで、専門外の人にも分かる日本語で簡潔に回答してください。"
    )

    try:
        # 軽量・安価モデルの例。必要に応じてモデルは変更可。
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "あなたは有能なアシスタントです。"},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
        )
        answer = completion.choices[0].message.content
        return {"message": answer}
    except Exception as e:
        # ログしたい場合は print や logger を利用
        # print(f"OpenAI API error: {e}")
        raise HTTPException(status_code=500, detail=f"OpenAI API 呼び出しでエラー: {e}")


# pipenv run uvicorn main:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

    # Chat Completions
    """
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )
    answer = completion.choices[0].message.content
    return {"message": answer}
    """
