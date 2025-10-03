import { NextResponse } from 'next/server'

export async function GET() {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  const nextauthSecret = process.env.NEXTAUTH_SECRET
  const nextauthUrl = process.env.NEXTAUTH_URL
  
  return NextResponse.json({
    env_check: {
      ADMIN_EMAIL: {
        exists: !!adminEmail,
        value: adminEmail,
        length: adminEmail?.length,
        trimmed: adminEmail?.trim(),
        trimmedLength: adminEmail?.trim().length
      },
      ADMIN_PASSWORD: {
        exists: !!adminPassword,
        value: adminPassword,
        length: adminPassword?.length,
        trimmed: adminPassword?.trim(),
        trimmedLength: adminPassword?.trim().length
      },
      NEXTAUTH_SECRET: {
        exists: !!nextauthSecret,
        length: nextauthSecret?.length,
        first20: nextauthSecret?.substring(0, 20)
      },
      NEXTAUTH_URL: {
        exists: !!nextauthUrl,
        value: nextauthUrl
      }
    },
    test_comparison: {
      input_email: 'admin@paranhospr.com.br',
      input_password: 'admin123',
      email_match: adminEmail?.trim() === 'admin@paranhospr.com.br',
      password_match: adminPassword?.trim() === 'admin123',
      both_match: adminEmail?.trim() === 'admin@paranhospr.com.br' && adminPassword?.trim() === 'admin123'
    }
  })
}
