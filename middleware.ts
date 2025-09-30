import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Liberar rotas específicas
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/health") ||
    pathname.startsWith("/api/auth/")
  ) {
    return NextResponse.next()
  }
  
  // Proteger outras rotas /admin/*
  if (pathname.startsWith("/admin/")) {
    // Aqui pode adicionar lógica de proteção se necessário
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"]
}