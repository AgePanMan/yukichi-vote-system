// GET /api/admin/logs を追加
router.get('/logs', async (req, res) => {
  const logs = await prisma.accessLog.findMany({
    orderBy: { timestamp: 'desc' },
    take: 100
  });
  res.json(logs);
});
