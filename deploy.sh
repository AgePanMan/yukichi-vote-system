#!/bin/bash

echo "📦 デプロイ開始..."
cd "$(dirname "$0")"

echo "🔄 Git pull..."
git pull origin main

echo "📦 npm install..."
cd backend
npm install --production
cd ..

echo "♻️ PM2 restart..."
pm2 restart ecosystem.config.js --env production

echo "✅ デプロイ完了"
