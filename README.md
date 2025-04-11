# 🎉 yukichi-vote-system

OASYSブロックチェーン対応の分散型投票システムです。  
提案の作成、ウォレット接続による投票、リアルタイムな投票集計、BAN管理機能など、DAOプラットフォームとして必要な要素をすべて含んだテンプレートです。

---

## 🚀 初心者向けセットアップ手順

### ✅ 1. このプロジェクトの準備

このzipファイルをダウンロード・解凍してください。

```
yukichi-vote-system/
├── frontend/      # フロントエンド (React + TailwindCSS)
├── backend/       # バックエンド (Express + Prisma)
└── README.md      # このファイル
```

---

### ✅ 2. 必要なツールをインストール

パソコンに以下がインストールされていることを確認してください：

- **Node.js**（https://nodejs.org/ja）
- **npm**（Node.jsを入れると一緒に付きます）
- 任意：**MetaMask拡張機能**（https://metamask.io）

---

### ✅ 3. フロントエンドの起動（React）

```bash
cd yukichi-vote-system/frontend
npm install
npm start
```

その後、ブラウザで `http://localhost:3000` にアクセスしてください。

---

### ✅ 4. バックエンドの起動（Express + Prisma）

```bash
cd ../backend
npm install
npx prisma migrate dev --name init
npx prisma generate
node server.js
```

サーバーが `http://localhost:3001` で起動します。

---

### ✅ 5. 環境変数ファイル（backend/.env）

```env
NODE_ENV=development
PORT=3001
DATABASE_URL="file:./dev.db"
OASYS_RPC_URL="https://your-oasys-node.example"  # 自分のRPC URLを指定
JWT_SECRET="your-secret"
CORS_ORIGIN=http://localhost:3000
```

---

## 📦 機能一覧

- ✅ トークンベースの投票システム（提案＋投票）
- ✅ ウォレット接続（ethers.js）
- ✅ 投票方式：1アドレス1票 or 保有量比例
- ✅ 投票集計のリアルタイム表示
- ✅ 提案履歴 / 投票履歴の表示
- ✅ BANユーザー管理
- ✅ スナップショット / 未Claim対応
- ✅ お知らせ一覧

---

## 📚 補足

- DBは開発中は `SQLite` を使用しています（`dev.db`）。
- 本番環境では `PostgreSQL` をおすすめします。
- デプロイは `Vercel`（frontend）、`Render` や `Railway`（backend）などが便利です。

---

## 🙋 サポート

使い方がわからない時やエラーが出たときは、以下をチェック：

- `npm install` を忘れていないか？
- `.env` の `DATABASE_URL` や `OASYS_RPC_URL` は正しく設定したか？
- MetaMask でウォレット接続できているか？

---

お気軽にカスタマイズ＆拡張してください 🚀
