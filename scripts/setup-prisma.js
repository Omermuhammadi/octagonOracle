const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Create .env file if it doesn't exist
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.log('Creating .env file...');
  fs.writeFileSync(
    envPath,
    'DATABASE_URL="postgresql://postgres:2003@localhost:5000/octagon_oracle"\nJWT_SECRET="your-secure-jwt-secret-key-change-this-in-production"'
  );
}

// Ensure backend/.env exists too
const backendEnvPath = path.join(__dirname, '..', 'backend', '.env');
if (!fs.existsSync(backendEnvPath)) {
  console.log('Creating backend/.env file...');
  fs.writeFileSync(
    backendEnvPath,
    'DATABASE_URL="postgresql://postgres:2003@localhost:5000/octagon_oracle"\nJWT_SECRET="your-secure-jwt-secret-key-change-this-in-production"'
  );
}

// Run Prisma generate in the root directory
console.log('Running Prisma generate in root directory...');
try {
  // First, install Prisma in the root directory if needed
  if (!fs.existsSync(path.join(__dirname, '..', 'node_modules', 'prisma'))) {
    console.log('Installing Prisma in root directory...');
    execSync('npm install prisma@6.9.0 @prisma/client@6.9.0 --save', {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    });
  }
  
  // Generate Prisma client in the root directory
  execSync('npx prisma generate --schema=backend/prisma/schema.prisma', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  console.log('Prisma client generated successfully in root directory!');
  
  // Also run db push to ensure the database is in sync
  console.log('Ensuring database is in sync with schema...');
  execSync('cd backend && npx prisma db push --schema=prisma/schema.prisma', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  
  // Create a simple test to verify the client works
  const testPath = path.join(__dirname, '..', 'scripts', 'prisma-test-output.js');
  fs.writeFileSync(testPath, `
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
console.log('Prisma client initialized successfully!');
  `);
  
  // Run the test
  console.log('Testing Prisma client initialization...');
  execSync(`node ${testPath}`, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  });
  
  console.log('Setup completed successfully!');
  
} catch (error) {
  console.error('Error in setup:', error);
  process.exit(1);
} 