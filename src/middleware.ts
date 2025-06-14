// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const isProtectedPath = request.nextUrl.pathname.startsWith("/"); // adjust this to match your protected folder

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/leaderboard/:path*",
    "/wallet/:path*",
    "/profile/:path*",
    "/cash-games/:path*",
    "/practice-games/:path*",
  ], // adjust to all (protected) paths
};
