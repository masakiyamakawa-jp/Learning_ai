# ---- /backend/Dockerfile-----
# ---- base ----
FROM python:3.11-slim

# システム系最小限
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential curl && \
    rm -rf /var/lib/apt/lists/*

# 作業ディレクトリ
WORKDIR /app

# 依存関係
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 本体とconfigをコピー
COPY main.py .
COPY config/config.json ./config/

# uvicorn で FastAPI を起動
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
