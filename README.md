# kaido02 ドキュメントインデックス

このリポジトリで参照すべきドキュメントとルールを README で一元的に整理しました。詳細な手順や背景は各ドキュメントを参照してください。

## クイックスタート

- **開発環境の構築**: `docs/getting-started.md`
  - 環境変数、依存インストール、`npm run dev`、`npm run seed:auth`、Playwright 実行方法など基本的な手順をまとめています。
- **タスク運用フロー**: `docs/workflow.md`
  - 計画 → Notion 登録 → ブランチ作成 → PR → Notion 更新までの流れ。
- **認証テストデータ**: `docs/auth-seed.md`
  - Supabase のユーザー投入手順や `seed-data/auth-users.json` の編集方法。
- **E2E テストとシナリオ一覧**: `docs/auth-test-cases.md`
  - Playwright で自動化されているケースと、手動確認が必要な範囲。

## ドキュメント一覧

| ファイル | 概要 |
| --- | --- |
| `docs/getting-started.md` | ローカルセットアップ、開発サーバー、シード、E2E 実行方法 |
| `docs/auth-seed.md` | Supabase 認証シードスクリプトの使い方と注意点 |
| `docs/auth-test-cases.md` | 認証機能のテストケース一覧と自動化ポリシー |
| `docs/workflow.md` | タスクの進め方、Notion/PR 連携、ブランチ/コミットルール |
| `docs/git.md` | リモートリポジトリ設定や初回 push 手順 |
| `docs/vercel.md` | Vercel プロジェクト設定・デプロイ手順 |
| `docs/notion-api-setup.md` | GitHub Actions から Notion タスクを更新する手順 |
| `docs/notion-cursor-integration.md` | Notion MCP と Cursor の連携ルール（モデル切り替え手順など） |

## 参考情報

- Supabase テストユーザーを追加したい場合は `seed-data/auth-users.json` を編集し、`npm run seed:auth` を実行してください。
- Notion 連携を行う際は `.ai/rule.md` のルールに従ってモデル切り替えと手順確認を行ってください。
