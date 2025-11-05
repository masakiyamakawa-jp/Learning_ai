# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# FastAPIインスタンスを生成
app = FastAPI()


# CORS (開発用。必要に応じて許可ドメインを絞ってください)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ***add_line***
# 受け取り用スキーマ
class QuestionIn(BaseModel):
    name: str
    topic: str


# ***add_line***
# 返却用スキーマ（任意）
class QuestionOut(BaseModel):
    message: str


# ***add_line***
# 新エンドポイント: POST /question
@app.post("/question", response_model=QuestionOut)
def post_question(payload: QuestionIn):
    name = payload.name.strip()
    topic = payload.topic.strip()
    message = f"{name}さん、ようこそ！！質問内容は{topic}ですね！！"
    return {"message": message}


# 旧GETエンドポイント：簡易動作確認用
@app.get("/question")
def get_question():
    return {"message": "Hello World!!"}
