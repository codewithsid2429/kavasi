import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';

export async function GET() {
  try {
    const db = getDbConnection();
    const [projects] = await db.query('SELECT * FROM Projects ORDER BY created_at DESC');
    return NextResponse.json({ projects }, { status: 200 });
  } catch (err) {
    console.error('Projects GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, description, imageUrl, projectLink } = await req.json();
    const db = getDbConnection();
    const [result] = await db.execute(
      'INSERT INTO Projects (name, description, imageUrl, projectLink) VALUES (?, ?, ?, ?)',
      [name, description, imageUrl, projectLink || '']
    );
    return NextResponse.json({ success: true, id: (result as any).insertId }, { status: 201 });
  } catch (err) {
    console.error('Projects POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
