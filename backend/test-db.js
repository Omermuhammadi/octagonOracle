const { Client } = require('pg');

// Connection configuration
const client = new Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'octagon_oracle',
  password: '2003',
  port: 5000,
});

async function testConnection() {
  try {
    // Connect to the database
    await client.connect();
    console.log('Connected to PostgreSQL successfully!');
    
    // Run a simple query
    const res = await client.query('SELECT NOW() as current_time');
    console.log('Current time from PostgreSQL:', res.rows[0].current_time);
    
    // Close the connection
    await client.end();
    console.log('Connection closed');
  } catch (err) {
    console.error('Error connecting to PostgreSQL:', err);
  }
}

// Run the test
testConnection(); 