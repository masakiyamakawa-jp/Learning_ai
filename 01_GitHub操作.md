# 基本操作

- ブランチ作成
    git branch "ブランチ名"

- ブランチ切り替え
    git checkout main

- ブランチ作成して切り替え
    git switch -c "ブランチ名"

- ブランチ確認
    git branch
    git branch --show-current

- リモートに反映
    git push origin "ブランチ名"
    - -u (--set-upstream)でローカルとリモートの追跡関係を設定
    - どのリモートブランチと同期すべきかを自動で判断可能に

- コミット
    - git add .
      - (新規追加・変更(削除は含まない)のステージング)
    - git add -A
      - (削除も含めたステージング)
    - git commit -m "chore: first commit"
      - -m "コミットメッセージ"


- git log --oneline --decorate -n 5
  - --oneline：各コミットを1行で表示（短いハッシュ＋メッセージ）
  - --decorate：ブランチ名・タグ・HEAD などの“ラベル”を表示
  - -n 5：直近5件だけ表示