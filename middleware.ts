
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Liberar rotas específicas do admin
  if (pathname.startsWith("/admin/health") || pathname.startsWith("/admin/login")) {
    return NextResponse.next()
  }
  
  // Para outras rotas admin, deixar passar (NextAuth vai gerenciar)
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"]
}
