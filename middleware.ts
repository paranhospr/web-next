import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  
  // Lista de rotas públicas que NUNCA devem ser protegidas
  const publicPaths = [
    '/admin/login',
    '/admin/health',
    '/api/auth/',
    '/_next/',
    '/favicon',
    '/api/'
  ]
  
  // Se é rota pública ou não é /admin, liberar imediatamente
  if (
    pathname === '/' ||
    publicPaths.some(path => pathname.startsWith(path)) ||
    !pathname.startsWith('/admin')
  ) {
    return NextResponse.next()
  }
  
  // Apenas para rotas /admin/* (exceto as públicas acima)
  try {
    const token = await getToken({ 
      req, 
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === 'production'
    })
    
    if (!token) {
      const loginUrl = new URL('/admin/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
  } catch (error) {
    console.error('Middleware auth error:', error)
    // Em caso de erro, redirecionar para login
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ]
}
