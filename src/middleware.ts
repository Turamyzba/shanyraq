// src/middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// List of paths that require authentication
const protectedPaths = [
  '/profile',
  '/my-announcements',
  '/my-responses',
  '/questionnaire'
];

// List of paths that should not be accessible when authenticated
const authRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verification'
];

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  const path = request.nextUrl.pathname;

  // Check if the path is protected and user is not authenticated
  const isProtectedPath = protectedPaths.some(pp => path.startsWith(pp));
  if (isProtectedPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Check if the path is an auth route and user is already authenticated
  const isAuthPath = authRoutes.some(ar => path.startsWith(ar));
  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

// Configure which paths this middleware is applied to
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};