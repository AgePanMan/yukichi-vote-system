const express = require('express');
const router = express.Router();

// モック通知データ（将来的にDB化予定）
const mockNotices = [
  { type: '投票終了', message: '「開発ロードマップ提案」が終了しました。', timestamp: Date.now() - 86400000 },
  { type: '投票開始', message: '「DAO運営費用の使用」に投票できます。', timestamp: Date.now() - 3600000 },
  { type: 'お知らせ', message: '未Claim投票の仕様をアップデートしました。', timestamp: Date.now() },
];

router.get('/', (req, res) => {
  res.json(mockNotices);
});

module.exports = router;
