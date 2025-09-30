
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Sempre liberar estas rotas sem qualquer verificação
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/health") ||
    pathname.startsWith("/api/auth/") ||
    pathname === "/admin" ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ]
}
