import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Permitir todas as requisições autenticadas
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Permitir acesso sem autenticação às rotas públicas
        if (
          pathname === "/admin/login" ||
          pathname === "/api/auth/signin" ||
          pathname === "/api/auth/callback" ||
          pathname === "/api/auth/csrf" ||
          pathname.startsWith("/api/auth/callback/")
        ) {
          return true;
        }
        
        // Exigir autenticação para todas as outras rotas /admin/*
        if (pathname.startsWith("/admin")) {
          return !!token;
        }
        
        // Permitir acesso a todas as outras rotas
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
  ]
};