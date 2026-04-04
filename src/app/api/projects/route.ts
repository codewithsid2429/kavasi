import { NextResponse } from 'next/server';

const MOCK_PROJECTS = [
  { _id: '1', name: 'AeroSpace ERP UI', description: 'A massive internal enterprise resource planning system redesign for an aerospace company. Built in Next.js and Tailwind.', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', projectLink: 'https://example.com' },
  { _id: '2', name: 'AutoCRM AI', description: 'An automated CRM that leverages local LLMs to categorize and reply to thousands of customer emails automatically.', imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800', projectLink: 'https://example.com' },
  { _id: '3', name: 'Fintech Dashboard', description: 'High performance data visualization dashboard tracking crypto and fiat assets in real time.', imageUrl: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800', projectLink: 'https://example.com' },
];

export async function GET() {
  // Bypassing MongoDB due to connection refusal, returning rich dummy data
  return NextResponse.json({ projects: MOCK_PROJECTS }, { status: 200 });
}

export async function POST(req: Request) {
  return NextResponse.json({ error: 'Mock mode active. Cannot save to DB.' }, { status: 500 });
}
