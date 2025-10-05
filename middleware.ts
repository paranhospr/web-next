import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ✅ Rotas sempre públicas (sem verificação de token)
  if (pathname === "/admin/health" || pathname === "/admin/login") {
    return NextResponse.next();
  }

  // 🔒 Rotas /admin/* protegidas: verificar token
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token) {
      // Redirecionar DIRETAMENTE para /admin/login (não para /api/auth/signin)
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = { 
  matcher: [
    "/admin",
    "/admin/:path*"
  ] 
};
