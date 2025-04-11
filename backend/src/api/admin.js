const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/ban', async (req, res) => {
  const { address, reason } = req.body;
  if (!address || !reason) return res.status(400).json({ error: 'addressとreasonは必須です' });
  try {
    const banned = await prisma.bannedUser.upsert({
      where: { address },
      update: { reason },
      create: { address, reason }
    });
    res.json({ success: true, banned });
  } catch (err) {
    console.error('BANエラー:', err);
    res.status(500).json({ error: 'サーバーエラー' });
  }
});

router.get('/banned', async (req, res) => {
  const list = await prisma.bannedUser.findMany();
  res.json(list);
});

module.exports = router;
