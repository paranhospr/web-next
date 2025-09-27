
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fazer proxy para a API real
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.paranhospr.com.br';
    const response = await fetch(`${apiUrl}/health`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      api_url: apiUrl,
      api_response: data
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        message: 'API indisponível',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    );
  }
}
