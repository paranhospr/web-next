import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    // Ler ENVs exatamente como o NextAuth faz
    const adminEmail = process.env.ADMIN_EMAIL?.trim();
    const adminPassword = process.env.ADMIN_PASSWORD?.trim();
    const nextauthSecret = process.env.NEXTAUTH_SECRET;
    const nextauthUrl = process.env.NEXTAUTH_URL;
    
    return NextResponse.json({
      test: "env-auth-validation",
      timestamp: new Date().toISOString(),
      envs: {
        ADMIN_EMAIL: {
          exists: !!adminEmail,
          value: adminEmail,
          length: adminEmail?.length || 0
        },
        ADMIN_PASSWORD: {
          exists: !!adminPassword,
          length: adminPassword?.length || 0,
          firstChar: adminPassword?.[0] || null,
          lastChar: adminPassword?.[adminPassword.length - 1] || null
        },
        NEXTAUTH_SECRET: {
          exists: !!nextauthSecret,
          length: nextauthSecret?.length || 0
        },
        NEXTAUTH_URL: {
          exists: !!nextauthUrl,
          value: nextauthUrl
        }
      },
      input: {
        email: email,
        password: password ? "***" : null,
        emailTrimmed: email?.trim(),
        passwordLength: password?.length || 0
      },
      validation: {
        emailMatch: email?.trim() === adminEmail,
        passwordMatch: password?.trim() === adminPassword,
        bothMatch: email?.trim() === adminEmail && password?.trim() === adminPassword
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to process request",
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
