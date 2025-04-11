const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 提案作成
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      address,
      startTime,
      endTime,
      options,
      strategy,
      includeUnclaimed
    } = req.body;

    if (!title || !description || !address || !options || options.length < 2) {
      return res.status(400).json({ error: '必要なフィールドが不足しています' });
    }

    const proposal = await prisma.proposal.create({
      data: {
        title,
        description,
        address,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        options: JSON.stringify(options),
        strategy,
        includeUnclaimed
      }
    });

    res.json({ success: true, id: proposal.id });
  } catch (err) {
    console.error('提案作成エラー:', err);
    res.status(500).json({ error: 'サーバーエラー' });
  }
});

// 提案一覧
router.get('/', async (req, res) => {
  const proposals = await prisma.proposal.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(proposals.map(p => ({
    ...p,
    options: JSON.parse(p.options)
  })));
});

// 提案詳細
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const proposal = await prisma.proposal.findUnique({ where: { id } });
  if (!proposal) return res.status(404).json({ error: '提案が見つかりません' });
  res.json({ ...proposal, options: JSON.parse(proposal.options) });
});

// 投票保存
router.post('/:id/votes', async (req, res) => {
  const id = parseInt(req.params.id);
  const { voter, option } = req.body;
  const proposal = await prisma.proposal.findUnique({ where: { id } });
  if (!proposal) return res.status(404).json({ error: '提案が見つかりません' });

  const weight = proposal.strategy === 'weight-by-token' ? 1 : 1; // 実装ではスナップショット参照

  await prisma.vote.create({
    data: {
      voter,
      option,
      weight,
      proposalId: id
    }
  });
  res.json({ success: true });
});

// 集計取得
router.get('/:id/results', async (req, res) => {
  const id = parseInt(req.params.id);
  const votes = await prisma.vote.findMany({ where: { proposalId: id } });
  const result = {};
  votes.forEach(v => {
    result[v.option] = (result[v.option] || 0) + v.weight;
  });
  res.json(result);
});

// ユーザー提案と投票履歴
router.get('/user/:address/proposals', async (req, res) => {
  const proposals = await prisma.proposal.findMany({
    where: { address: req.params.address },
    orderBy: { createdAt: 'desc' }
  });
  res.json(proposals);
});

router.get('/user/:address/votes', async (req, res) => {
  const votes = await prisma.vote.findMany({
    where: { voter: req.params.address },
    orderBy: { id: 'desc' }
  });
  res.json(votes);
});

module.exports = router;
