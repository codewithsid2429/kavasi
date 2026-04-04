import { NextResponse } from 'next/server';

const MOCK_JOBS = [
  { _id: '1', title: 'Senior Next.js Developer', type: 'Full-Time', description: 'Join our team to build high-performance web applications using Next.js 15, Turbopack, and TailwindCSS.' },
  { _id: '2', title: 'AI Automation Intern', type: 'Internship', description: 'Learn and deploy intelligent workflows using LangChain, OpenAI APIs, and custom Python backend systems.' },
];

export async function GET() {
  return NextResponse.json({ jobs: MOCK_JOBS }, { status: 200 });
}

export async function POST(req: Request) {
  // Admin posting new job
  return NextResponse.json({ error: 'Mock mode active. Cannot save to DB.' }, { status: 500 });
}
