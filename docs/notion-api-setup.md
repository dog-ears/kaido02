[README](../README.md) / Notion API セットアップ

# Notion API セットアップ

## 概要

GitHub ActionsからNotion APIを使用してタスクのステータスを自動更新するためのセットアップ手順です。

## Notion Integrationの作成

1. [Notion Integrations](https://www.notion.so/my-integrations)にアクセス
2. **+ New integration**をクリック
3. 以下の情報を入力:
   - **Name**: `GitHub Actions`（任意の名前）
   - **Associated workspace**: 使用するワークスペースを選択
   - **Type**: Internal
4. **Submit**をクリック
5. **Internal Integration Token**をコピー（後で使用します）

## データベースへのアクセス権限付与

1. Notionでタスク管理ツールのデータベースページを開く
2. 右上の**...**メニューをクリック
3. **Connections**を選択
4. 作成したIntegration（例: `GitHub Actions`）を選択して接続

## GitHub Secretsの設定

1. GitHubリポジトリの**Settings** → **Secrets and variables** → **Actions**に移動
2. **New repository secret**をクリック
3. 以下のシークレットを追加:

   - **Name**: `NOTION_API_TOKEN`
   - **Value**: 先ほどコピーしたInternal Integration Tokenを貼り付け
4. **Add secret**をクリック

## 動作確認

プルリクエストをマージすると、GitHub Actionsが自動的に実行され、Notionタスクのステータスが「完了」に更新されます。

## トラブルシューティング

### エラー: Unauthorized

- Notion APIトークンが正しく設定されているか確認
- Integrationがデータベースに接続されているか確認

### エラー: Object not found

- PR本文にNotionタスクのURLが正しく記載されているか確認
- URLの形式が `https://www.notion.so/{page-id}` であることを確認

### エラー: Property not found

- データベースのプロパティ名が「ステータス」であることを確認
- プロパティタイプが「Status」であることを確認

