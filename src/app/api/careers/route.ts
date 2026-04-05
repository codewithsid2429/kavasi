import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';

export async function GET() {
  try {
    const db = getDbConnection();
    const [jobs] = await db.query('SELECT * FROM Jobs ORDER BY created_at DESC');
    return NextResponse.json({ jobs }, { status: 200 });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, type, description } = await req.json();
    if (!title || !type || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const db = getDbConnection();
    const [result] = await db.execute(
      'INSERT INTO Jobs (title, type, description) VALUES (?, ?, ?)',
      [title, type, description]
    );
    return NextResponse.json({ success: true, jobId: (result as any).insertId }, { status: 201 });
  } catch (error) {
    console.error('Error posting job:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
