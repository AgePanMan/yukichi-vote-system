# 🗳️ yukichi-vote-system

[![Deploy from ZIP](https://github.com/AgePanMan/yukichi-vote-system/actions/workflows/deploy-from-zip.yml/badge.svg)](https://github.com/AgePanMan/yukichi-vote-system/actions/workflows/deploy-from-zip.yml)

分散型投票をサポートする Web3 対応の投票システムです。提案作成、ウォレット接続、トークン保有量による投票、集計、管理など多機能を搭載。

---

## 🚀 機能一覧

- ✅ 提案作成 / 投票 / 集計
- 📊 グラフ・ランキング形式の投票結果表示
- 🌍 多言語対応（日本語 / 英語）
- 🔒 管理者認証 + ロール管理（admin/user）
- 📄 通知投稿・BANユーザー管理
- 📝 アクセスログ（DB + UI + 検索 + CSV出力）
- 📅 ロードマップ公開 (`/roadmap`)
- 💬 コメント・投票UIの国際対応
- 🛠 GitHub Actions CI + Discord 通知連携
- 🐛 Issueテンプレート・PRテンプレート・Auto Assign 対応

---

## 📦 導入手順

### 1. クローン

```bash
git clone git@github.com:AgePanMan/yukichi-vote-system.git
cd yukichi-vote-system
```

### 2. `.env` 設定

```bash
cp .env.template .env
# DISCORD_WEBHOOK_URL をセット（オプション）
```

### 3. 開発環境起動

```bash
docker-compose up --build
```

- フロントエンド: http://localhost:3000
- バックエンド: http://localhost:3001

---

## 🧪 GitHub Actions CI

- `Deploy from ZIP` ワークフローでZIPアーカイブを展開 & 自動Push
- 成功時に Discord 通知が届くよう設定
- PR作成時に自動で作成者をAssigneeに設定（Auto Assign）

---

## 📂 ディレクトリ構成（概要）

```
yukichi-vote-system/
├── frontend/              # React + Tailwind フロント
├── backend/               # Express + Prisma バックエンド
├── .github/               # GitHub Actions / テンプレート
│   ├── workflows/
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── .env.template          # 環境変数テンプレート
└── docker-compose.yml
```

---

## 🧩 コントリビューション

- PR時はテンプレートに沿って記載してください
- コミットは Conventional Commits 準拠でお願いします

例:
```
feat: 投票結果を円グラフで可視化
```

---

## 📌 ライセンス

MIT


---

## 🖼️ デモ＆スクリーンショット

### 💻 提案作成画面
![Proposal Form](./docs/screenshots/proposal-form.png)

### 📊 投票結果（円グラフ＋ランキング）
![Vote Result Graph](./docs/screenshots/vote-graph.png)

### 🎞️ 操作GIF（投票フロー）
![Voting Demo](./docs/screenshots/vote-flow.gif)

---

## 🌐 デモサイト

> ※ ログインは任意のウォレットアドレスで操作可能です（署名不要）

🔗 https://yukichi-demo.vercel.app/

---


---

## ♻️ PM2 起動設定（ecosystem.config.js）

バックエンドは PM2 を使ってプロセス管理を行います。

`ecosystem.config.js` に定義済み：

```bash
# 開発環境起動
pm2 start ecosystem.config.js --env development

# 本番環境起動
pm2 start ecosystem.config.js --env production
```

バックエンドのエントリーポイント： `./backend/src/server.js`

---

## 🚀 デプロイスクリプト（ConoHa VPS向け）

本番環境では `deploy.sh` を使ってデプロイ操作を簡略化できます：

```bash
./deploy.sh
```

実行内容：

- `git pull`（mainブランチの更新を取得）
- `npm install`（バックエンドの依存インストール）
- `pm2 restart` による再起動

---

## 🛡️ PM2 永続化（systemd連携）

サーバー再起動後も PM2 を自動で復元するには以下のコマンドを一度実行します：

```bash
pm2 startup
pm2 save
```

これにより `ecosystem.config.js` のプロセスが systemd に登録され、自動起動されるようになります。

---

## 🔔 PM2 ログ監視（Discord通知）

定期的に PM2 のログを確認し、`Error` や `Unhandled` を検出したら Discord に通知します。

`scripts/log-watch.js` を cron などで実行してください：

```bash
*/5 * * * * /usr/bin/node /path/to/yukichi-vote-system/scripts/log-watch.js >> /var/log/yukichi-monitor.log 2>&1
```

Webhook は `.env` の `DISCORD_WEBHOOK_URL` を使用します。

---

## 🔐 サーバーセキュリティ設定（UFW + fail2ban）

本番VPSでは以下のセキュリティ強化設定を行うことを推奨します：

### ✅ UFW（ファイアウォール）

```bash
sudo apt update
sudo apt install ufw
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 3000
sudo ufw allow 3001
sudo ufw enable
sudo ufw status
```

### 🚫 fail2ban（SSHアタック防御）

```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
sudo fail2ban-client status
sudo fail2ban-client status sshd
```

これらにより、サーバーの攻撃面を最小限に抑えられます。

---

## 🌐 HTTPS構成（Nginx + Let’s Encrypt）

本番環境では Nginx を使用してリバースプロキシとHTTPS化を構成します。

### ✅ リバースプロキシ

- `/` は localhost:3000（フロントエンド）
- `/api` は localhost:3001（バックエンドAPI）

`.nginx/yukichi.conf` にテンプレートあり：

```bash
sudo cp .nginx/yukichi.conf /etc/nginx/sites-available/yukichi
sudo ln -s /etc/nginx/sites-available/yukichi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 🔒 HTTPS（無料SSL）

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yukichi.fun -d www.yukichi.fun
```

更新は自動設定されますが、確認用に以下を定期実行：

```bash
sudo certbot renew --dry-run
```

---

## 🔄 GitHub Webhook 自動デプロイ

GitHub の Push に応じて `deploy.sh` を自動実行する構成です。

1. GitHubリポジトリ > Settings > Webhooks > Add webhook
   - Payload URL: `http://<YOUR_VPS_IP>:4000/webhook`
   - Content type: `application/json`
   - イベント: `Just the push event.`

2. サーバー上で `scripts/webhook-server.js` を起動：

```bash
pm2 start scripts/webhook-server.js --name webhook
pm2 save
```

3. 以後は `git push` するだけで ConoHa VPS が自動更新されます。

---

## 🧹 PM2ログの自動ローテーション

バックエンドプロセスのログファイル肥大化を防ぐため、`pm2-logrotate` モジュールを導入します：

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:interval 1d
```

設定内容は以下で確認できます：

```bash
pm2 conf
```
