import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Permitir acesso à página de login sempre
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }
  
  // Permitir todas as rotas de autenticação
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }
  
  // Para outras rotas admin, verificar se há token de sessão
  if (pathname.startsWith("/admin")) {
    const sessionToken = req.cookies.get("next-auth.session-token") || 
                        req.cookies.get("__Secure-next-auth.session-token");
    
    if (!sessionToken) {
      const url = new URL("/admin/login", req.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};