const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function adminOnly(req, res, next) {
  const address = (req.body.address || req.query.address || '').toLowerCase();
  if (!address) return res.status(403).json({ error: 'アドレスが必要です' });

  const user = await prisma.user.findUnique({ where: { address } });
  if (user && user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: '管理者専用APIです' });
  }
};
