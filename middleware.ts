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
        
        // Rotas públicas sempre liberadas
        if (pathname === "/admin/health") return true
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
