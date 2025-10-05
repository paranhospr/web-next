import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Rotas públicas - liberar acesso direto
  if (pathname === "/admin/login" || pathname === "/admin/health" || pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }

  // Proteger rotas /admin/*
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
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
