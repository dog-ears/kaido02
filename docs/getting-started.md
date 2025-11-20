# Getting Started

このガイドでは、ローカル環境の構築や典型的な開発フローに必要な最低限のコマンドをまとめています。Supabase のテストプロジェクトに接続できる状態で進めてください。

## 1. 環境変数の設定

ルートに用意してある `.env.example` をコピーして `.env` を作成してください。

```bash
cp .env.example .env
```

各変数の意味は次のとおりです。

| 変数 | 用途 |
| --- | --- |
| `GITHUB_TOKEN` | GitHub API を叩くスクリプトや自動化タスク用の Personal Access Token |
| `NOTION_API_KEY` / `NOTION_DATABASE_ID` | `docs/notion-api-setup.md` で説明している Notion 連携に使用 |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase クライアント (ブラウザ/サーバー) が参照するプロジェクト情報 |
| `SUPABASE_SERVICE_ROLE_KEY` | `npm run seed:auth` など管理権限を使うローカル処理用（本番では使用しないこと） |

必要に応じて各値を埋めてから次の手順へ進みます。

## 2. 依存関係のインストール

```bash
npm install
```

## 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで <http://localhost:3000> を開きます。

## 4. 認証テストデータのシード

Supabase の Auth テーブルをシードユーザーで初期化できます。

```bash
npm run seed:auth
```

- `NODE_ENV=development` でのみ実行可能です。
- ユーザー定義は `seed-data/auth-users.json` を編集してください。
- 手順や背景は `docs/auth-seed.md` に詳細があります。

## 5. Playwright E2E テスト

主要な認証・セッションフローは Playwright で自動化されています。実行前に `.env` が正しく設定されていることを確認してください。

```bash
npm run test:e2e
```

- テスト実行時、`tests/e2e/global-setup.ts` が `npm run seed:auth` を呼び出してユーザーを初期化します。
- シードをスキップしたい場合は `SKIP_E2E_SEED=true npm run test:e2e`。
- `PLAYWRIGHT_BASE_URL` または `BASE_URL` を `.env` に設定すると別ホストを対象にできます。
- テストケースの一覧は `docs/auth-test-cases.md` を参照してください。

## 参考ドキュメント

- `docs/workflow.md`: タスク運用やブランチ戦略
- `docs/notion-api-setup.md`: GitHub Actions から Notion を更新する手順
- `docs/notion-cursor-integration.md`: Notion MCP と Cursor の連携ルール

