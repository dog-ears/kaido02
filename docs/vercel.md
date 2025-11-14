# Vercel デプロイ設定

## 本プロジェクトのデプロイ設定

- **プロジェクト名**: `kaido02`
- **GitHubリポジトリ**: `dog-ears/kaido02`
- **フレームワーク**: Next.js 16.0.1
- **ビルドコマンド**: `next build`（自動検出）

## Vercelアカウントの準備

Vercelにデプロイするには、まずVercelアカウントを準備し、GitHubアカウントと連携する必要があります。

1. [Vercel](https://vercel.com)にアクセス
2. **Sign Up**をクリック
3. **Continue with GitHub**を選択してGitHubアカウントでログイン
4. VercelがGitHubリポジトリへのアクセスを要求するので、**Authorize**をクリック

## プロジェクトのインポート

GitHubリポジトリをVercelにインポートします。

1. Vercelダッシュボードで**Add New...** → **Project**をクリック
2. **Import Git Repository**から`dog-ears/kaido02`を選択
3. プロジェクト名を確認（デフォルト: `kaido02`）
4. **Framework Preset**が**Next.js**として自動検出されていることを確認
5. **Deploy**をクリック

## ビルド設定

Next.jsプロジェクトは自動的に検出され、以下の設定が適用されます。

- **Framework Preset**: Next.js
- **Build Command**: `next build`（自動検出）
- **Output Directory**: `.next`（自動検出）
- **Install Command**: `npm install`（自動検出）

必要に応じて、**Settings** → **General** → **Build & Development Settings**で設定を変更できます。

## デプロイの実行

### 初回デプロイ

プロジェクトをインポートすると、自動的に初回デプロイが開始されます。

1. デプロイが完了するまで待機（通常1-2分）
2. デプロイが完了すると、**Visit**ボタンからデプロイされたURLにアクセス可能

### 自動デプロイ

GitHubリポジトリにプッシュすると、自動的にデプロイが実行されます。

- **mainブランチへのプッシュ**: 本番環境（Production）にデプロイ
- **その他のブランチへのプッシュ**: プレビュー環境（Preview）にデプロイ

## カスタムドメイン

必要に応じて、カスタムドメインを設定できます。

1. プロジェクトの**Settings** → **Domains**に移動
2. **Add Domain**をクリック
3. ドメイン名を入力
4. Vercelが提供するDNS設定に従って、ドメインのDNSレコードを設定
5. DNS設定の反映を待機（通常数分〜数時間）

## 環境変数

環境変数が必要な場合、以下の手順で設定します。

1. プロジェクトの**Settings** → **Environment Variables**に移動
2. **Add New**をクリック
3. 変数名と値を入力
4. 適用する環境（Production、Preview、Development）を選択
5. **Save**をクリック

環境変数を追加・変更した場合、次回のデプロイから反映されます。

