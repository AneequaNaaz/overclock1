import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request,
  })

  // Allow all auth-related routes and public pages
  const pathname = request.nextUrl.pathname
  const isAuthRoute = pathname.startsWith("/auth") || pathname === "/" || pathname.startsWith("/setup")

  // If it's a public route, allow access
  if (isAuthRoute) {
    return response
  }

  return response
}
