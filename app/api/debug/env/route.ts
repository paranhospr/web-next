import { NextResponse } from 'next/server'

export async function GET() {
  const envCheck = {
    NEXTAUTH_URL: {
      exists: !!process.env.NEXTAUTH_URL,
      value: process.env.NEXTAUTH_URL || 'NOT_SET',
      length: process.env.NEXTAUTH_URL?.length || 0
    },
    NEXTAUTH_SECRET: {
      exists: !!process.env.NEXTAUTH_SECRET,
      value: process.env.NEXTAUTH_SECRET ? '***HIDDEN***' : 'NOT_SET',
      length: process.env.NEXTAUTH_SECRET?.length || 0
    },
    ADMIN_EMAIL: {
      exists: !!process.env.ADMIN_EMAIL,
      value: process.env.ADMIN_EMAIL || 'NOT_SET',
      length: process.env.ADMIN_EMAIL?.length || 0
    },
    ADMIN_PASSWORD: {
      exists: !!process.env.ADMIN_PASSWORD,
      value: process.env.ADMIN_PASSWORD ? '***HIDDEN***' : 'NOT_SET',
      length: process.env.ADMIN_PASSWORD?.length || 0
    },
    NODE_ENV: process.env.NODE_ENV || 'NOT_SET',
    timestamp: new Date().toISOString()
  }

  return NextResponse.json(envCheck, { status: 200 })
}
