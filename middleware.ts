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
    // Em produção (HTTPS), NextAuth usa cookies seguros automaticamente
    // Tentar ler com ambas as configurações
    let token = await getToken({ 
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: true, // Produção usa cookies seguros
      cookieName: "next-auth.session-token"
    })
    
    // Se não encontrou com secure, tentar sem secure (fallback)
    if (!token) {
      token = await getToken({ 
        req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: false,
        cookieName: "next-auth.session-token"
      })
    }
    
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
