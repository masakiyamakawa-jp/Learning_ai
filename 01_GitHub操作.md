# 基本操作

- ブランチ作成
    git branch "ブランチ名"
- ブランチ切り替え
    git checkout main
- ブランチ確認
    git branch
    git branch --show-current
- リモートに反映
    git push origin "ブランチ名"
- コミット
    - git add .
      - (新規追加・変更(削除は含まない)のステージング)
    - git add -A
      - (削除も含めたステージング)
    - git commit -m "chore: first commit"
      - -m "コミットメッセージ"

