import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Configuration
const PROTECTED_ROUTES = ["/dashboard", "/contribute"];
const PUBLIC_ROUTES = ["/auth/signin", "/auth/signup", "/api/auth"];
const JWT_SECRET = process.env.JWT_SECRET;

// Token verification with better error handling
function verifyToken(token: string): boolean {
  if (!JWT_SECRET) {
    console.error("JWT_SECRET is not configured");
    return false;
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}

// Check if route is public
function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => pathname.startsWith(route));
}

// Check if route is protected
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => pathname.startsWith(route));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Add security headers to all responses
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Return early for public routes and API auth routes
  if (isPublicRoute(pathname)) {
    return response;
  }

  // Check if route is protected
  if (!isProtectedRoute(pathname)) {
    return response;
  }

  // Get token from cookies
  const token = req.cookies.get("token")?.value;

  // No token found - redirect to signin
  if (!token) {
    const signinUrl = new URL("/auth/signin", req.url);
    // Add return URL for better UX
    signinUrl.searchParams.set("callbackUrl", req.url);
    return NextResponse.redirect(signinUrl);
  }

  // Verify token
  if (!verifyToken(token)) {
    const signinUrl = new URL("/auth/signin", req.url);
    signinUrl.searchParams.set("error", "invalid_token");
    return NextResponse.redirect(signinUrl);
  }

  // Token is valid - proceed with request
  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/contribute/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};