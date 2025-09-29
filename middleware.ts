import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname.startsWith("/admin/health") || pathname.startsWith("/admin/login")) {
    return NextResponse.next()
  }
  return NextResponse.next()
}

export const config = { matcher: ["/admin/:path*"] }