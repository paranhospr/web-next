
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Sempre liberar estas rotas sem qualquer verificação
  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/health") ||
    pathname.startsWith("/api/auth/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname === "/" ||
    pathname.startsWith("/api/") ||
    !pathname.startsWith("/admin")
  ) {
    return NextResponse.next()
  }
  
  // Para rotas /admin/* (exceto login e health), verificar autenticação
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET 
    })
    
    if (!token) {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ]
}
