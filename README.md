## セットアップ

1. `.env` に Supabase プロジェクトの URL / ANON KEY を設定してください（`.env.example` などは用意していません）。  
   例:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=... # scripts/seed-auth.ts で使用
   ```
2. 依存をインストール:
   ```bash
   npm install
   ```

## 開発サーバー

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## 認証テストデータのシード

Supabase の認証テーブルをテストユーザーで初期化するスクリプトがあります。

```bash
npm run seed:auth
```

- `NODE_ENV=development` でのみ実行できます。
- データの内容は `seed-data/auth-users.json` を編集することで変更できます。

## E2E テスト（Playwright）

主要な認証フロー（登録 / ログイン / ログアウト / セッション維持）を Playwright で自動テストしています。  
実行前に `.env` が正しく設定され、Supabase テストプロジェクトに接続できることを確認してください。

```bash
npm run test:e2e
```

- Playwright は自動で `npm run dev` を起動し、`tests/e2e/global-setup.ts` で `npm run seed:auth` を実行してからテストを開始します。
- シードをスキップしたい場合は `SKIP_E2E_SEED=true npm run test:e2e` としてください。
- `PLAYWRIGHT_BASE_URL`（または `BASE_URL`）を `.env` に設定すると、デフォルトの `http://localhost:3000` 以外のホストに対してテストできます。

テストケースの詳細や自動化対象は `docs/auth-test-cases.md` を参照してください。
