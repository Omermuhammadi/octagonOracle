import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { verifyPassword, createToken } from '@/lib/auth';

// Validation schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

export async function POST(req: Request) {
  try {
    console.log('Login API called');
    
    // Safely parse JSON with error handling
    let body;
    try {
      body = await req.json();
      console.log('Request body parsed:', JSON.stringify(body, null, 2));
    } catch (e) {
      console.error('JSON parsing error:', e);
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
    }
    
    // Validate request body
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }
    
    const { email, password } = result.data;
    
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    
    // Create JWT token
    const token = createToken({ userId: user.id });
    
    // Return user data (excluding password)
    const { password: _, ...userData } = user;
    
    // Create response with user data and token
    const response = NextResponse.json({ 
      message: 'Login successful',
      user: userData,
      token
    });
    
    // Set HTTP-only cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 