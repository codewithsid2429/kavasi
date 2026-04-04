import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  // Application submission endpoint
  // Usually this saves to a JobApplicant mongoose model and emails the admin
  return NextResponse.json({ success: true, message: 'Application received' }, { status: 200 });
}
