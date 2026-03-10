import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const { passphrase } = await req.json();
    
    // The founder passphrase. For extreme security, this should be in .env
    const VALID_PASSPHRASE = process.env.FOUNDER_PASSPHRASE || 'omega-protocol-26';

    if (passphrase === VALID_PASSPHRASE) {
      const cookieStore = await cookies();
      cookieStore.set('__nc_founder_ghost', 'active_founder_session_v1', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  // Check if session exists securely on the server
  const cookieStore = await cookies();
  const hasGhostSession = cookieStore.get('__nc_founder_ghost')?.value === 'active_founder_session_v1';
  
  return NextResponse.json({ active: hasGhostSession });
}
