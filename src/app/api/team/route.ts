import { NextResponse } from 'next/server';

const MOCK_TEAM = [
  { _id: '1', name: 'Siddhartha', role: 'Founder & CEO', imageUrl: '/images/founder.jpg', order: 1 },
  { _id: '2', name: 'Kashish', role: 'Lead Developer', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', order: 2 },
  { _id: '3', name: 'Rahul Singh', role: 'AI Specialist', imageUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=400', order: 3 },
  { _id: '4', name: 'Rohit Singh', role: 'UI/UX Designer', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', order: 4 },
];

export async function GET() {
  // Bypassing MongoDB due to connection refusal, returning rich dummy data
  return NextResponse.json({ team: MOCK_TEAM }, { status: 200 });
}

export async function POST(req: Request) {
  return NextResponse.json({ error: 'Mock mode active. Cannot save to DB.' }, { status: 500 });
}
