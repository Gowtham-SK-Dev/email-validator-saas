import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {

  // Get the pathname of the request (e.g. /, /dashboard, /login)
  const { pathname } = request.nextUrl

  // Get the token from cookies
  const token = request.cookies.get("auth-token")?.value

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/admin"]
  const authRoutes = ["/login", "/register"]

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // If accessing a protected route without a token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  // If accessing auth routes with a valid token, redirect to dashboard
  if (isAuthRoute && token) {
    const dashboardUrl = new URL("/dashboard", request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  // Allow the request to continue
  return NextResponse.next()
}

// Configure which paths the middleware should run on
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
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
