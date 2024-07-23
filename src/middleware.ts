import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the routes that require authentication
const protectedRoutes = ['/dashboard'];
const userProfileRoutes = ['/user-profile'];

// Middleware function
export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const role = req.cookies.get('role')?.value;

  // Check if the request path is a protected route
  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    // If there's no token or the role is not 'admin', redirect to the sign-in page
    if (!token || role !== 'admin') {
      return NextResponse.redirect(new URL('/sign-in-admin', req.url));
    }
  }

  // Check if the request path is a user profile route
  if (userProfileRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    // If there's no token, redirect to the sign-in page
    if (!token || role !== 'user') {
      return NextResponse.redirect(new URL('/sign-in', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/user-profile/:path*'
  ],
};
