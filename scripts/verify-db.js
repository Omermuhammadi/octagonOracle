// Database verification script
const { PrismaClient } = require('@prisma/client');

async function main() {
  console.log('Verifying database connection...');
  
  try {
    // Create a direct connection to the database
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || "postgresql://postgres:2003@localhost:5000/octagon_oracle"
        }
      },
      log: ['query', 'info', 'warn', 'error'],
    });
    
    // Test connection
    console.log('Testing connection...');
    const userCount = await prisma.user.count();
    console.log(`✅ Connection successful! Found ${userCount} users in database.`);
    
    // Test schema
    console.log('Verifying schema...');
    const schemaInfo = await prisma.$queryRaw`
      SELECT table_name, column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'User'
    `;
    console.log('Schema information:');
    console.log(schemaInfo);
    
    // Create a test user if none exist
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
      console.log('✅ Test user created:', testUser.id);
    }
    
    // Disconnect
    await prisma.$disconnect();
    console.log('✅ Database verification completed successfully');
  } catch (error) {
    console.error('❌ Database verification failed:', error);
    process.exit(1);
  }
}

// Run the main function
main()
  .catch((e) => {
    console.error('❌ Unhandled error:', e);
    process.exit(1);
  }); 