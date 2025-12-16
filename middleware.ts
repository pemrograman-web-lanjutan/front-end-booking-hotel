import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protect dashboard and admin routes
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('token')?.value;
    
    console.log(`[Middleware] Accessing: ${pathname}`);
    console.log(`[Middleware] Token exists: ${!!token}`);

    // If no token, redirect to login
    if (!token) {
      console.log(`[Middleware] No token found, redirecting to login`);
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    console.log(`[Middleware] Token found, allowing access`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only protect dashboard routes, be more specific
    '/dashboard/:path*',
  ],
};
