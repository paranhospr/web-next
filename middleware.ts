import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const p = req.nextUrl.pathname
  if (p.startsWith('/admin/health') || p.startsWith('/admin/login') || p.startsWith('/api/auth')) {
    return NextResponse.next()
  }
  return NextResponse.next()
}
export const config = { matcher: ['/admin/:path*'] }