# 🎉 yukichi-vote-system

OASYSブロックチェーンを基盤にした分散型コミュニティ投票システムです。  
提案作成・トークンベースの投票・リアルタイム集計・お知らせ機能などを備えています。

---

## 🚀 利用方法

### 1. このテンプレートの取得

```bash
git clone https://github.com/yourname/yukichi-vote-system.git
cd yukichi-vote-system
```

> または ChatGPT から提供された zip を解凍し、`yukichi-vote-system` ディレクトリに移動してください。

---

### 2. フロントエンドのセットアップ

```bash
cd frontend
npm install
npm start
```

- React + TailwindCSS 構成
- `localhost:3000` で起動します

---

### 3. バックエンドのセットアップ

```bash
cd ../backend
npm install
npx prisma migrate dev --name init
npx prisma generate
node src/server.js
```

- Express.js + Prisma + SQLite構成（`.env` を確認）
- APIサーバは `localhost:3001` で起動

---

### 4. 環境変数（backend/.env）

```env
NODE_ENV=development
PORT=3001
DATABASE_URL="file:./dev.db"
OASYS_RPC_URL="https://your-oasys-node.example"
JWT_SECRET="your-secret"
CORS_ORIGIN=http://localhost:3000
```

> ※ `.env` の `OASYS_RPC_URL` にはご自身のノード接続URLを設定してください。

---

## 📁 プロジェクト構成

```
yukichi-vote-system/
├── frontend/         # React + TailwindCSS
└── backend/          # Express.js + Prisma + SQLite
```

---

## ✨ 主な機能

- ✅ 提案作成（資格条件付き）
- ✅ トークン投票（1アドレス1票/保有量比例）
- ✅ スナップショット＋未Claim対応
- ✅ 投票結果グラフ表示
- ✅ プロファイル・履歴・通知

---

## 📦 本番環境候補

| 構成     | サービス候補         |
|----------|----------------------|
| フロント | Vercel, Netlify      |
| バック   | Render, Railway      |
| DB       | Supabase, PlanetScale |

---

## 🛠 作者 & ライセンス

- 🧑‍💻 Author: CBX / yukichi.fun チーム
- 📄 MIT License

---

ご質問やコントリビューションも歓迎します！
