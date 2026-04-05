import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = getDbConnection();
    await db.execute('DELETE FROM Projects WHERE id = ?', [id]);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Project DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
