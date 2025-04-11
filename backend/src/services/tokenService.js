const { PrismaClient } = require('@prisma/client');
const { ethers } = require('ethers');
const prisma = new PrismaClient();
const provider = new ethers.providers.JsonRpcProvider(process.env.OASYS_RPC_URL);

const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function name() view returns (string)",
  "function symbol() view returns (string)"
];

async function getTokenInfo(tokenAddress) {
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const [name, symbol, decimals, totalSupply] = await Promise.all([
    contract.name(),
    contract.symbol(),
    contract.decimals(),
    contract.totalSupply()
  ]);
  return { name, symbol, decimals, totalSupply: totalSupply.toString() };
}

async function getHolderBalance(tokenAddress, holderAddress) {
  const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
  const balance = await contract.balanceOf(holderAddress);
  return balance.toString();
}

async function cacheSnapshot(proposalId, tokenAddress, includeUnclaimed, voters) {
  for (const address of voters) {
    const balance = await getHolderBalance(tokenAddress, address);
    await prisma.tokenHolder.upsert({
      where: { holderAddress_tokenAddress: { holderAddress: address, tokenAddress } },
      update: { balance, snapshotAt: new Date() },
      create: {
        holderAddress: address,
        tokenAddress,
        balance,
        snapshotAt: new Date()
      }
    });
  }
}

module.exports = {
  getTokenInfo,
  getHolderBalance,
  cacheSnapshot
};
