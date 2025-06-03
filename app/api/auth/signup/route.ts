import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';
import { hashPassword, createToken } from '@/lib/auth';

// Validation schema
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  age: z.number().int().positive(),
  gender: z.string(),
  role: z.enum(['beginner', 'fighter', 'coach'])
});

export async function POST(req: Request) {
  try {
    console.log('Signup API called');
    
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
    const result = signupSchema.safeParse(body);
    if (!result.success) {
      console.error('Validation error:', result.error.format());
      return NextResponse.json({ error: 'Invalid input data', details: result.error.format() }, { status: 400 });
    }
    
    const { email, password, name, age, gender, role } = result.data;
    console.log('Validated data:', { email, name, age, gender, role });
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        age,
        gender,
        role
      }
    });
    
    console.log('User created successfully:', user.id);
    
    // Create JWT token
    const token = createToken({ userId: user.id });
    
    // Return user data (excluding password)
    const { password: _, ...userData } = user;
    
    // Set cookie for the token
    const response = NextResponse.json({ 
      message: 'User created successfully',
      user: userData,
      token
    }, { status: 201 });
    
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
    console.error('Signup error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 