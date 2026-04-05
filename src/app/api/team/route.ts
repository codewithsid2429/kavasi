import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';

export async function GET() {
  try {
    const db = getDbConnection();
    const [team] = await db.query('SELECT * FROM TeamMembers ORDER BY display_order ASC');
    return NextResponse.json({ team }, { status: 200 });
  } catch (err) {
    console.error('Team GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, role, imageUrl, display_order } = await req.json();
    const db = getDbConnection();
    const [result] = await db.execute(
      'INSERT INTO TeamMembers (name, role, imageUrl, display_order) VALUES (?, ?, ?, ?)',
      [name, role, imageUrl, display_order || 0]
    );
    return NextResponse.json({ success: true, id: (result as any).insertId }, { status: 201 });
  } catch (err) {
    console.error('Team POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
