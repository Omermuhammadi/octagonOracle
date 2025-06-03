import { PrismaClient } from '@prisma/client';

// Database connection options
const databaseUrl = process.env.DATABASE_URL || "postgresql://postgres:2003@localhost:5000/octagon_oracle";

// Create a factory function to get a fresh Prisma client instance
export function getPrismaClient() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl
      }
    },
    log: ['query', 'error', 'warn'],
  });
  
  return prisma;
}

// Helper function to execute database operations with proper connection handling
export async function withPrisma<T>(
  operation: (prisma: PrismaClient) => Promise<T>
): Promise<T> {
  const prisma = getPrismaClient();
  
  try {
    return await operation(prisma);
  } finally {
    await prisma.$disconnect();
  }
}

// Export a singleton instance for non-API route usage
export const prisma = getPrismaClient(); 