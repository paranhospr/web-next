import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Middleware executado após validação de autenticação
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Rotas públicas sempre liberadas (sem necessidade de autenticação)
        if (pathname === "/admin/health") return true
        if (pathname === "/admin/login") return true  // CRÍTICO: libera página de login
        if (pathname.startsWith("/api/auth/")) return true
        
        // Rotas admin protegidas - requer token válido
        if (pathname.startsWith("/admin")) {
          return !!token
        }
        
        // Outras rotas liberadas
        return true
      }
    },
    pages: {
      signIn: "/admin/login"
    },
    secret: process.env.NEXTAUTH_SECRET
  }
)

export const config = {
  matcher: [
    "/admin/:path*"
  ]
}
