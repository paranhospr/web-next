import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Rotas públicas sempre liberadas (sem necessidade de autenticação)
  if (pathname === "/admin/health") {
    return NextResponse.next()
  }
  
  if (pathname === "/admin/login") {
    return NextResponse.next()
  }
  
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next()
  }
  
  // Para rotas admin protegidas, verificar token
  if (pathname.startsWith("/admin")) {
    // O cookie é 'next-auth.session-token' (sem prefixo __Secure-)
    // Mesmo em HTTPS, usar secureCookie=false pois o nome não tem prefixo
    const token = await getToken({ 
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: false, // Cookie não tem prefixo __Secure-
      cookieName: "next-auth.session-token"
    })
    
    // Se não há token, redirecionar para login
    if (!token) {
      const loginUrl = new URL("/admin/login", req.url)
      loginUrl.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/:path*"
  ]
}
