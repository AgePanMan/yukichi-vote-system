const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getAllProposals() {
  const proposals = await prisma.proposal.findMany({ orderBy: { createdAt: 'desc' } });
  return proposals.map(p => ({ ...p, options: JSON.parse(p.options) }));
}

async function getProposalById(id) {
  const proposal = await prisma.proposal.findUnique({ where: { id } });
  if (!proposal) return null;
  return { ...proposal, options: JSON.parse(proposal.options) };
}

async function createProposal(data) {
  const proposal = await prisma.proposal.create({
    data: {
      ...data,
      options: JSON.stringify(data.options),
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime)
    }
  });
  return proposal;
}

async function deleteProposalById(id) {
  return prisma.$transaction([
    prisma.vote.deleteMany({ where: { proposalId: id } }),
    prisma.proposal.delete({ where: { id } })
  ]);
}

module.exports = {
  getAllProposals,
  getProposalById,
  createProposal,
  deleteProposalById
};
