# ---- /frontend/Dockerfile ----
# ---- build stage ----
FROM node:20-alpine AS build

WORKDIR /app

# 依存を先に入れてキャッシュを効かせる
COPY package*.json ./
# RUN npm ci
RUN npm install

# 残りのソース
COPY . .

# Composeから渡されるビルド引数（REACT_APP_* はビルド時に取り込まれる）
ARG REACT_APP_API_BASE
ENV REACT_APP_API_BASE=${REACT_APP_API_BASE}

# 本番ビルド
RUN npm run build

# ---- run stage (nginx) ----
FROM nginx:alpine

# SPA のための設定（任意：ルーター対策）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ビルド物を配置
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
