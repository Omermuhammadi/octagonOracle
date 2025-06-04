import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// List of paths that require authentication
const protectedPaths = [
  '/profile',
  '/settings',
];

// List of paths that are accessible only for non-authenticated users
const authPaths = [
  '/auth/login',
  '/auth/signup',
];

// JWT secret (same as in auth.ts)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

// Verify JWT token using jose (Edge Runtime compatible)
async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;
  
  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(protectedPath => 
    path === protectedPath || path.startsWith(`${protectedPath}/`)
  );
  
  // Check if the path is for authentication
  const isAuthPath = authPaths.some(authPath => 
    path === authPath || path.startsWith(`${authPath}/`)
  );
  
  // If the path is protected and there's no valid token, redirect to login
  if (isProtectedPath) {
    if (!token) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
    
    // Verify token
    const decodedToken = await verifyJWT(token);
    if (!decodedToken) {
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('callbackUrl', encodeURI(request.url));
      return NextResponse.redirect(url);
    }
  }
  
  // If the user is authenticated and tries to access auth pages, redirect to home
  if (isAuthPath && token) {
    const decodedToken = await verifyJWT(token);
    if (decodedToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}; 