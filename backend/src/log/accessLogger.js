const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function logAccess({ action, address, detail }) {
  await prisma.accessLog.create({
    data: {
      action,
      address,
      detail
    }
  });
}

module.exports = { logAccess };
