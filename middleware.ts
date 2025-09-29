import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = { matcher: ['/admin/:path*'] }

export default function middleware(req: NextRequest) {
  const url = new URL(req.url)
  if (url.pathname.startsWith('/admin/health')) return NextResponse.next()

  const hasAuthEnv = !!process.env.NEXTAUTH_URL && !!process.env.NEXTAUTH_SECRET
  if (!hasAuthEnv) return NextResponse.next()

  const hasSession = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token')
  if (!hasSession) { url.pathname = '/admin/login'; return NextResponse.redirect(url) }

  return NextResponse.next()
}
