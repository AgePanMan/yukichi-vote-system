const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function saveVote(proposalId, voter, option, weight = 1) {
  return prisma.vote.create({
    data: {
      voter,
      option,
      weight,
      proposalId
    }
  });
}

async function getProposalResults(proposalId) {
  const votes = await prisma.vote.findMany({ where: { proposalId } });
  const result = {};
  votes.forEach(v => {
    result[v.option] = (result[v.option] || 0) + v.weight;
  });
  return result;
}

module.exports = {
  saveVote,
  getProposalResults
};
