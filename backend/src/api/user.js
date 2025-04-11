const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/role', async (req, res) => {
  const address = (req.query.address || '').toLowerCase();
  if (!address) return res.status(400).json({ error: 'address is required' });

  const user = await prisma.user.upsert({
    where: { address },
    update: {},
    create: { address, role: 'user' }
  });

  res.json({ role: user.role });
});

module.exports = router;
