// ...前略（省略済）...
const { logAccess } = require('../log/accessLogger');

router.delete('/:id', adminOnly, async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.vote.deleteMany({ where: { proposalId: id } });
    await prisma.proposal.delete({ where: { id } });
    logAccess({ action: 'deleteProposal', address: req.body.address || 'unknown', detail: { proposalId: id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: '削除に失敗しました' });
  }
});
