# Git リポジトリの設定

## 本プロジェクトのリモート設定

- **リモート名**: `origin`
- **URL**: `git@github.com:dog-ears/kaido02.git`

## リモート設定

ローカルリポジトリにリモートを設定する方法を記載します。

### リモートの確認

現在のリモート設定を確認するには、以下のコマンドを実行します。

```bash
git remote -v
```

### リモートの追加

リモートが設定されていない場合、以下のコマンドで追加します。

HTTPS を使用する場合:

```bash
git remote add origin https://github.com/dog-ears/kaido02.git
```

SSH を使用する場合:

```bash
git remote add origin git@github.com:dog-ears/kaido02.git
```

### リモートの変更

既存のリモート URL を変更する場合:

HTTPS を使用する場合:

```bash
git remote set-url origin https://github.com/dog-ears/kaido02.git
```

SSH を使用する場合:

```bash
git remote set-url origin git@github.com:dog-ears/kaido02.git
```

## 初回プッシュ

リモートを設定したら、初回のプッシュを行います。

```bash
git push -u origin main
```

`-u`オプションを付けることで、以降は`git push`だけでプッシュできるようになります。
