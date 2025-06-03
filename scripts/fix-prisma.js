const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define paths
const rootDir = path.resolve(__dirname, '..');
const schemaPath = path.join(rootDir, 'backend', 'prisma', 'schema.prisma');
const envPath = path.join(rootDir, '.env');

// Ensure DATABASE_URL is in .env
console.log('Setting up environment variables...');
const envContent = `DATABASE_URL="postgresql://postgres:2003@localhost:5000/octagon_oracle"
JWT_SECRET="your-secure-jwt-secret-key-change-this-in-production"`;
fs.writeFileSync(envPath, envContent);

console.log('Fixing Prisma client...');

try {
  // Clean up any existing Prisma client
  const prismaClientDir = path.join(rootDir, 'node_modules', '.prisma', 'client');
  if (fs.existsSync(prismaClientDir)) {
    console.log('Removing existing Prisma client...');
    try {
      fs.rmSync(prismaClientDir, { recursive: true, force: true });
    } catch (e) {
      console.warn('Could not remove existing Prisma client:', e.message);
    }
  }
  
  // Force reinstall Prisma
  console.log('Reinstalling Prisma...');
  execSync('npm install prisma@6.9.0 @prisma/client@6.9.0 --save --force', {
    stdio: 'inherit',
    cwd: rootDir
  });
  
  // Generate Prisma client with explicit output path
  console.log('Generating Prisma client...');
  execSync(`npx prisma generate --schema="${schemaPath}"`, {
    stdio: 'inherit',
    env: {
      ...process.env,
      DATABASE_URL: "postgresql://postgres:2003@localhost:5000/octagon_oracle"
    },
    cwd: rootDir
  });
  
  console.log('✅ Prisma client fixed successfully');
} catch (error) {
  console.error('❌ Error fixing Prisma client:', error);
  process.exit(1);
} 