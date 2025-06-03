// Test if Prisma client can be imported
const { PrismaClient } = require('@prisma/client');

try {
  console.log('Attempting to create PrismaClient instance...');
  const prisma = new PrismaClient();
  console.log('PrismaClient successfully created!');
  console.log('Prisma client version:', prisma._clientVersion);
  process.exit(0);
} catch (error) {
  console.error('Error creating PrismaClient:', error);
  process.exit(1);
} 