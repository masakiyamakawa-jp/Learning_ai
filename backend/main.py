# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


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


# エンドポイント定義
@app.get("/question")
def get_question():
    return {"message": "Hello World!!"}
