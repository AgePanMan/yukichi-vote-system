// ...既存コード...
const { logAccess } = require('../log/accessLogger');

router.post('/', adminOnly, (req, res) => {
  const { type, message } = req.body;
  if (!type || !message) {
    return res.status(400).json({ error: 'typeとmessageは必須です' });
  }
  const newNotice = {
    type,
    message,
    timestamp: Date.now()
  };
  noticeStore.unshift(newNotice);
  logAccess({ action: 'sendNotification', address: req.body.address || 'unknown', detail: { type, message } });
  res.json({ success: true });
});
