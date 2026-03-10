import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/lib/emails';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const previewName = "Michelle"; // Example from CSV
    const previewLink = "https://neurochiromastermind.com/portal";

    const result = await EmailService.sendOnboardingReady(email, previewName, previewLink);

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
