// Direct database connection test
const { Client } = require('pg');

async function main() {
  console.log('Testing direct PostgreSQL connection...');
  
  // Connection string
  const connectionString = process.env.DATABASE_URL || "postgresql://postgres:2003@localhost:5000/octagon_oracle";
  
  // Create a new client
  const client = new Client({ connectionString });
  
  try {
    // Connect to the database
    await client.connect();
    console.log('✅ Connected to PostgreSQL database successfully');
    
    // Run a simple query
    const result = await client.query('SELECT current_timestamp as time, current_database() as db');
    console.log('Database time:', result.rows[0].time);
    console.log('Database name:', result.rows[0].db);
    
    // Check if User table exists
    const tableResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'User'
      );
    `);
    
    if (tableResult.rows[0].exists) {
      console.log('✅ User table exists');
      
      // Count users
      const countResult = await client.query('SELECT COUNT(*) FROM "User"');
      console.log(`Found ${countResult.rows[0].count} users in the database`);
    } else {
      console.log('❌ User table does not exist');
    }
    
    console.log('✅ Database test completed successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  } finally {
    // Close the connection
    await client.end();
    console.log('Database connection closed');
  }
}

// Run the main function
main(); 