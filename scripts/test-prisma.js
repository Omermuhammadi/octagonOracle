// Test script to check if Prisma is working properly
const { PrismaClient } = require('@prisma/client');

async function main() {
  console.log('Testing Prisma connection...');
  
  try {
    const prisma = new PrismaClient();
    
    // Test connection by counting users
    const userCount = await prisma.user.count();
    console.log(`Connection successful! Found ${userCount} users in the database.`);
    
    await prisma.$disconnect();
    console.log('Prisma test completed successfully!');
  } catch (error) {
    console.error('Prisma test failed:', error);
    process.exit(1);
  }
}

main(); 