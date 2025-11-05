# main.py
from fastapi import FastAPI

# FastAPIインスタンスを生成
app = FastAPI()


# エンドポイント定義
@app.get("/question")
def get_question():
    return {"message": "Hello World!!"}
