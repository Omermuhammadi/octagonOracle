import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Test API called');
    
    // Test the database connection
    const userCount = await prisma.user.count();
    console.log(`Found ${userCount} users in the database`);
    
    return NextResponse.json({
      status: 'success',
      message: 'Prisma connection successful',
      userCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Prisma test error:', error);
    
    return NextResponse.json({
      status: 'error',
      message: 'Prisma connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 