# Notion の AI から Cursor を操作できるようにする

## 概要

Notion 公式の MCP サーバーを設定することで、Notion の AI から Cursor を操作できるようになります。
このドキュメントでは、その設定方法と使用方法を記載します。

### MCP とは

MCP（Model Context Protocol）は、AI アシスタントが外部ツールやサービスと安全にやり取りするためのオープンスタンダードです。
Notion MCP は、Notion がホストする MCP サーバーで、AI ツールが Notion ワークスペースに安全にアクセスできるようにします。

参考サイト: [Notion の MCP 公式ドキュメント](https://developers.notion.com/docs/mcp)

## セットアップ方法

詳細な手順については、[Notion MCP 公式ドキュメント](https://developers.notion.com/docs/get-started-with-mcp)を参照してください。

### 接続方法

Notion MCP への接続方法は主に 2 つあります。

**(1) Notion アプリから接続**

人気のある AI ツールでは、Notion アプリから簡単に接続できます。

**(2) AI ツールから接続**

AI ツールの MCP ディレクトリで "Notion MCP" を検索するか、設定ファイルに直接 URL を指定して接続します。

本プロジェクトでは **(1) Notion アプリから接続** を選択しました。設定方法は以下の通りです。

1. Notion アプリで **Settings** を開く
2. **Connections** → **Notion MCP** に移動
3. 使用する AI ツール（Cursor）を選択
4. OAuth フローを完了して接続

## 問題点

Notion MCP を使用する際、Cursor のモデル設定によってはエラーが発生する場合があります。

- **Auto モデル**: 一部の操作（特に Notion のステータス更新など）でエラーが発生する可能性があります
- **推奨モデル**: GPT-5 Codex や Gemini 2.5 Flash などの特定のモデルを明示的に指定することで、エラーを回避できます

### 対処方法

この問題に対処するため、本プロジェクトでは以下のルールを設定しています（`.ai/rule.md` 参照）。

**Notion操作の開始時:**
1. Notion操作を実行する前に、いったん処理を止める
2. ユーザーにモデルをGPT-5 CodexやGemini 2.5 Flashなどの推奨モデルに切り替えるよう促す
3. モデル切り替えが完了したことを確認してから、Notion操作を実行する

**Notion操作の完了時:**
1. Notion操作が完了したら、いったん処理を止める
2. ユーザーにモデルをAutoに戻すよう促す
3. モデルがAutoに戻ったことを確認してから、次の処理に進む

これにより、Notion操作時に適切なモデルを使用し、完了後にAutoに戻すことで、エラーを回避しながら効率的に作業を進めることができます。
