import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const jobId = url.searchParams.get('jobId');

    const db = getDbConnection();
    let query = `
      SELECT a.*, j.title as jobTitle 
      FROM Applicants a 
      JOIN Jobs j ON a.job_id = j.id
    `;
    let params: any[] = [];

    if (jobId && jobId !== 'all') {
      query += ' WHERE a.job_id = ?';
      params.push(jobId);
    }

    query += ' ORDER BY a.created_at DESC';

    const [applicants] = await db.execute(query, params);

    return NextResponse.json({ applicants }, { status: 200 });
  } catch (error) {
    console.error('Error fetching applicants:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
