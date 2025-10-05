import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Lista de rotas públicas que NÃO precisam de autenticação
  const publicPaths = [
    "/admin/health",
    "/admin/login",
  ]
  
  // Se a rota é pública, permitir acesso direto
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }
  
  // Se a rota é da API de autenticação, permitir acesso direto
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next()
  }
  
  // Para rotas admin protegidas, verificar token
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ 
      req,
      secret: process.env.NEXTAUTH_SECRET,
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
