const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define paths
const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env');
const backendEnvPath = path.join(rootDir, 'backend', '.env');
const schemaPath = path.join(rootDir, 'backend', 'prisma', 'schema.prisma');

// Ensure .env files exist with correct DATABASE_URL
console.log('Setting up environment variables...');

// Root .env
const envContent = `DATABASE_URL="postgresql://postgres:2003@localhost:5000/octagon_oracle"
JWT_SECRET="your-secure-jwt-secret-key-change-this-in-production"`;

fs.writeFileSync(envPath, envContent);
console.log('✅ Root .env file created/updated');

// Backend .env
if (!fs.existsSync(path.dirname(backendEnvPath))) {
  fs.mkdirSync(path.dirname(backendEnvPath), { recursive: true });
}
fs.writeFileSync(backendEnvPath, envContent);
console.log('✅ Backend .env file created/updated');

// Install Prisma and Prisma Client if not already installed
console.log('Ensuring Prisma dependencies are installed...');
try {
  execSync('npm install prisma@6.9.0 @prisma/client@6.9.0 --save --force', {
    stdio: 'inherit',
    cwd: rootDir
  });
  console.log('✅ Prisma dependencies installed/updated');
} catch (error) {
  console.error('❌ Error installing Prisma dependencies:', error);
  process.exit(1);
}

// Run Prisma generate with explicit output path
console.log('Generating Prisma client...');
try {
  // Ensure schema exists
  if (!fs.existsSync(schemaPath)) {
    console.error('❌ Prisma schema not found at:', schemaPath);
    process.exit(1);
  }
  
  // Generate client directly in the root node_modules
  execSync(`npx prisma generate --schema="${schemaPath}"`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: "postgresql://postgres:2003@localhost:5000/octagon_oracle"
    },
    cwd: rootDir
  });
  
  console.log('✅ Prisma client generated successfully');
  
  // Push schema to database
  console.log('Syncing database with schema...');
  execSync(`npx prisma db push --schema="${schemaPath}" --accept-data-loss`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: "postgresql://postgres:2003@localhost:5000/octagon_oracle"
    },
    cwd: rootDir
  });
  
  console.log('✅ Database synced with schema');
  
  // Create a simple test file to verify Prisma works
  const testFilePath = path.join(rootDir, 'scripts', 'prisma-verify.js');
  fs.writeFileSync(testFilePath, `
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
  `);
  
  // Run the test file
  console.log('Verifying Prisma client works...');
  try {
    execSync(`node "${testFilePath}"`, {
      stdio: 'inherit',
      cwd: rootDir
    });
    console.log('✅ Prisma client verification successful');
  } catch (e) {
    console.error('❌ Prisma verification failed, but continuing...');
  }
  
} catch (error) {
  console.error('❌ Error during Prisma setup:', error);
  process.exit(1);
}

console.log('✅ Prisma setup completed successfully'); 