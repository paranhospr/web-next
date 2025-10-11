import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Permitir acesso sem autenticação a rotas públicas
  const publicPaths = [
    "/admin/login",
    "/api/auth",
  ];
  
  // Verificar se é uma rota pública
  const isPublicPath = publicPaths.some(path => 
    pathname === path || pathname.startsWith(path + "/")
  );
  
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // Para rotas protegidas /admin/*, verificar autenticação
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ 
      req,
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    if (!token) {
      // Redirecionar para login se não autenticado
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