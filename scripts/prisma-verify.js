
// Simple test to verify Prisma client works
const { PrismaClient } = require('@prisma/client');

async function testPrisma() {
  try {
    const prisma = new PrismaClient();
    const count = await prisma.user.count();
    console.log('Prisma client works! User count:', count);
    await prisma.$disconnect();
    return true;
  } catch (e) {
    console.error('Prisma test failed:', e);
    return false;
  }
}

testPrisma().then(success => {
  if (!success) process.exit(1);
});
  