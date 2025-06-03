// Import PrismaClient directly from the generated client
const { PrismaClient } = require('@prisma/client');

async function main() {
  console.log('Testing Prisma connection...');
  
  try {
    // Create a new PrismaClient instance
    const prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
    
    // Test connection by counting users
    console.log('Counting users...');
    const userCount = await prisma.user.count();
    console.log(`Connection successful! Found ${userCount} users in the database.`);
    
    // Test creating a test user if none exist
    if (userCount === 0) {
      console.log('Creating a test user...');
      const testUser = await prisma.user.create({
        data: {
          email: 'test@example.com',
          password: '$2a$10$zZ3JxsH6Ub3FoLy7vHW9j.h1UPzPzzI9XOIDYSb.MjOtWOHyaXGRK', // hashed "password123"
          name: 'Test User',
          age: 30,
          gender: 'male',
          role: 'beginner'
        }
      });
      console.log('Test user created:', testUser.id);
    }
    
    // Disconnect from the database
    await prisma.$disconnect();
    console.log('Prisma test completed successfully!');
  } catch (error) {
    console.error('Prisma test failed:', error);
    process.exit(1);
  }
}

// Run the main function
main(); 