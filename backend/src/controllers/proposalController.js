const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createProposal(req, res) {
  const { title, description, address, startTime, endTime, options, strategy, includeUnclaimed } = req.body;
  if (!title || !description || !address || options.length < 2) {
    return res.status(400).json({ error: '不正な入力' });
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
}

async function getProposalList(req, res) {
  const proposals = await prisma.proposal.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(proposals.map(p => ({ ...p, options: JSON.parse(p.options) })));
}

module.exports = { createProposal, getProposalList };
