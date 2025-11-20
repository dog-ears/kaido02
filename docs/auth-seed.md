[README](../README.md) / ローカル環境向け Supabase Auth シード手順

# ローカル環境向け Supabase Auth シード手順

テストユーザーでの検証を素早く行うため、ローカル環境専用のシードスクリプトを用意しています。  
このスクリプトは Supabase Auth のユーザーテーブルを一度空にし、`seed-data/auth-users.json` の内容で再作成します。

> **注意:** 本番や共有環境では絶対に実行しないでください。`NODE_ENV !== 'development'` の場合はスクリプトが即終了するよう防御しています。

---

## 1. 事前準備

1. **Supabase Service Role Key の取得**  
   Supabase Dashboard → **Project Settings** → **API** → `Service Role Key` を「Reveal」してコピーします。
2. **環境変数の設定（ローカルのみ）**  
   `.env`（またはローカル用 env ファイル）に以下を設定します。  
   ```
   NEXT_PUBLIC_SUPABASE_URL=...        # プロジェクトURL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...   # anonキー
   SUPABASE_SERVICE_ROLE_KEY=...       # 取得したService Role
   ```
   - `SUPABASE_SERVICE_ROLE_KEY` は強力な権限を持つため、Gitにコミットしたり公開しないでください。
3. **シードデータの編集（任意）**  
   `seed-data/auth-users.json` に投入したいユーザーをJSON配列で定義します。
   ```json
   [
     {
       "email": "dev-user1@example.com",
       "password": "Password123",
       "user_metadata": { "role": "tester" }
     },
     {
       "email": "dev-user2@example.com",
       "password": "Password456",
       "user_metadata": { "role": "viewer" }
     }
   ]
   ```

---

## 2. 実行方法

```bash
npm run seed:auth
```

- 内部で `NODE_ENV=development tsx scripts/seed-auth.ts` を実行します。
- 既存ユーザーを1件ずつ削除した後、JSONファイルの内容を作成します。
- 処理ログがターミナルに逐次出力されます。

---

## 3. 動作確認手順

1. `npm run seed:auth` を実行してユーザーを再作成  
2. `npm run dev` でローカルサーバーを起動  
3. `seed-data/auth-users.json` に記載した各ユーザーでログインを確認  
   - 例: `dev-user1@example.com / Password123`
   - 例: `dev-user2@example.com / Password456`

ユーザーを追加・変更したい場合は JSON を編集して、再度 `npm run seed:auth` を実行してください。

