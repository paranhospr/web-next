import { NextResponse } from "next/server";

export async function GET() {
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
  const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET ?? "";
  const NEXTAUTH_URL = process.env.NEXTAUTH_URL ?? "";
  
  return NextResponse.json({
    ADMIN_EMAIL: { 
      exists: !!ADMIN_EMAIL, 
      length: ADMIN_EMAIL.length 
    },
    ADMIN_PASSWORD: { 
      exists: !!ADMIN_PASSWORD, 
      length: ADMIN_PASSWORD.length 
    },
    NEXTAUTH_SECRET: { 
      exists: !!NEXTAUTH_SECRET, 
      length: NEXTAUTH_SECRET.length 
    },
    NEXTAUTH_URL: { 
      value: NEXTAUTH_URL 
    },
  });
}
