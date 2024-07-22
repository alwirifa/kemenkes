import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the routes that require authentication
const protectedRoutes = ['/dashboard'];

// Middleware function
export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Check if the request path is a protected route
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    // If there's no token, redirect to the sign-in page
    if (!token) {
      return NextResponse.redirect(new URL('/sign-in-admin', req.url));
    }
  }

  // Allow the request to proceed if authenticated or if not a protected route
  return NextResponse.next();
}

// Configure the matcher to apply middleware only to specific routes
export const config = {
  matcher: ['/dashboard/:path*'],
};
