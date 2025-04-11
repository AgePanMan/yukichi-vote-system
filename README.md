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


---

## 📘 APIドキュメント

### 🔍 Swagger UIで確認

起動後、以下のURLからAPI仕様を確認できます：

[http://localhost:3001/api-docs](http://localhost:3001/api-docs)

### 📦 使用ライブラリ

- `swagger-jsdoc`
- `swagger-ui-express`


---

## ☁️ フロントエンド自動デプロイ（Vercel）

### ✅ 設定手順

1. [Vercel](https://vercel.com/) に GitHub アカウントでログイン
2. 「Import Git Repository」→ `yukichi-vote-system` を選択
3. プロジェクト設定：
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. GitHub に Push すると自動でデプロイされます 🚀

### 🌐 デプロイ先 URL

初回デプロイ後、Vercel ダッシュボードから確認できます。


---

## 🧪 テスト（Jest + Supertest）

### 📦 インストール

```bash
cd backend
npm install --save-dev jest supertest
```

### 🚀 テスト実行

```bash
npx jest
```

### 📁 テスト対象

- `/api/proposals` 提案作成・取得・投票・集計の動作確認
- ステータスコード / レスポンス形式の検証
- Jest設定: `backend/jest.config.js`


### 🔁 CI自動テスト

GitHub Actions (`ci.yml`) にて、以下のテストも実行されます：

- Jest + Supertest によるバックエンド API テスト
- `/backend/tests/` にテストケースを記述
- CI上でも `npx jest` にて実行


---

## 🐳 Dockerによる起動

### ✅ 必要なツール
- Docker
- Docker Compose

### 🔧 起動方法

```bash
docker-compose build
docker-compose up
```

アクセス先：
- フロントエンド → http://localhost:3000
- バックエンド → http://localhost:3001


---

## ✅ CIでのDocker + Jestテスト統合

`.github/workflows/test.yml` にて以下が自動実行されます：

- PostgreSQLコンテナをセットアップ
- Prismaスキーマを読み込み
- JestでAPIテストを実行


---

## 📂 推奨コード構成（コード分割）

本プロジェクトは中規模化を見据え、以下のようにコードを分割しています：

### frontend/
- `components/`: 再利用可能なUI部品（例：Button）
- `hooks/`: カスタムフック（例：useFetch）
- `services/`: API呼び出しラッパー
- `utils/`: 汎用フォーマッタや関数群

### backend/
- `controllers/`: ビジネスロジック処理（例：proposalController）
- `services/`: DB・ブロックチェーン連携など
- `api/`: ルーティング層で controller を呼び出し


---

## 🌍 多言語対応（i18n）

### ✅ 使用ライブラリ

- `react-i18next`
- `i18next`

### 📂 翻訳ファイル

- `src/i18n/en.json`
- `src/i18n/ja.json`

### 📦 初期化ファイル

```js
import './i18n';
```

### 使用例（翻訳）

```js
const { t } = useTranslation();
return <h1>{t('welcome')}</h1>;
```


---

## 🌐 国際対応の強化

### 🌍 言語切り替え

- ユーザーが日本語 / 英語を `<select>` で即時切り替え可能
- `LanguageSwitcher.js` コンポーネントを利用
- `i18n.changeLanguage(lng)` で即時反映

### 🗓 日付フォーマットのローカライズ

- `utils/formatDate.js` を `Intl.DateTimeFormat` ベースに変更
- 現在の言語設定に基づき `Apr 11, 2025` / `2025年4月11日` のように表示形式を切替


### 💴 通貨フォーマット対応

- `utils/formatCurrency.js` にて `Intl.NumberFormat` を使用
- 言語に応じて `¥1,000` や `$10.00` と表示を切り替え

### 🌐 ブラウザ初期言語の自動適用

- `navigator.language` に基づいて初期言語を `ja` or `en` に自動設定


---

### 🧩 翻訳キー構造の最適化

- `proposal.title` や `common.vote` のようにカテゴリ + キー形式を採用
- 機能・画面単位で翻訳整理がしやすくなり、メンテナンス性が向上
- 翻訳ファイル：`i18n/ja.json`, `i18n/en.json` に構造化済


---

### 🌐 非同期翻訳ロード（i18next-http-backend）

- `i18next-http-backend` を使用し、翻訳ファイルを `public/locales/{lng}/translation.json` からロード
- 多言語数が増えても初期表示速度を維持
- `i18n/index.js` にて `.use(HttpBackend)` により設定済み


---

## 🛠 管理者画面（Admin Dashboard）

- `/admin` ダッシュボード画面から、以下の管理操作が可能です：
  - `/admin/ban-users`：ユーザーのBAN実行フォーム
  - `/admin/proposals`：提案の一覧と状態表示
- 管理画面のUIは `frontend/src/pages/admin/` 以下に構成されています


---

## 🔐 管理者認証（MetaMask署名 + ホワイトリスト）

- 管理者ウォレットでログイン（署名不要のアドレス認証）
- `/admin` 配下のページは `AdminGate` によって保護されます
- サーバー側は `.env` の `ADMIN_WALLETS` によってアドレス検証を行います
- 管理者かどうかを確認するための `/api/admin/check` API を実装済み


---

### 🗑 提案削除（管理者機能）

- `/admin/proposals` 提案一覧に「削除」ボタンを追加
- バックエンドに `DELETE /api/proposals/:id` を実装（`adminOnly` ミドルウェアで保護）
- 削除時には投票データも同時に削除されます


---

### 📣 通知送信（管理者機能）

- `/admin/notifications` 画面から通知の投稿が可能に
- POST `/api/notifications` にて通知メッセージを送信
- バックエンドはメモリ上の `noticeStore` に格納（将来的にDB化可能）
- `adminOnly` ミドルウェアで保護済み


---

### 📊 監視ダッシュボード（管理者機能）

- `/admin/overview` にてシステム内のサマリ情報を表示
- 表示内容：
  - 登録された提案数
  - 総投票数
  - BANされたユーザー数
- API: `GET /api/admin/summary`（Prismaの集計関数を使用）


---

## 📝 アクセスログ

- 管理者の操作（提案削除・通知投稿・BANなど）をログファイルに記録
- ログ内容：タイムスタンプ・操作種別・実行アドレス・詳細
- 保存先：`logs/access.log`
- ロガー関数：`logAccess()` は `src/log/accessLogger.js` に実装


---

### 🗂 アクセスログのDB化 + 管理者UI

- `AccessLog` モデルを追加し、すべてのログをDBに保存
- `/admin/logs` 画面にてログを確認可能（降順表示）
- 項目：アドレス / アクション / 内容 / 日時
- 最大100件の最新ログを表示


---

### 🔍 アクセスログ検索機能

- 管理者ログ画面 `/admin/logs` にてアドレス・アクション名でのキーワード検索が可能
- キーワードは大文字小文字を区別せず部分一致


---

### 📤 アクセスログのCSVエクスポート

- フィルタ済みログを「access-logs.csv」としてダウンロード可能
- CSV形式：timestamp, address, action, detail


---

### 👥 ロール管理（管理者 / 一般ユーザー）

- Prismaに `User` モデルを追加（address + role）
- デフォルトでは role: "user"、必要に応じてDB上で "admin" に更新
- フロントでは `UserContext` にてアドレスとロールを取得
- API側では `adminOnly` ミドルウェアが role="admin" のみ許可


---

## 🗺 開発ロードマップ（優先度順）

### 🚀 High Priority
- 投票結果のCSVエクスポート
- グラフによる投票集計表示
- スマホ対応のレスポンシブ最適化

### 🟡 Medium Priority
- 提案へのコメント機能
- 提案スケジューリング（開始・終了予約）
- 提案カレンダーUI（可視化）

### 🔵 Low Priority
- DAO参加者の一覧表示とCSV出力
- 外部API連携（Chainlink 等）
- 秘匿性を高めた匿名投票機能
