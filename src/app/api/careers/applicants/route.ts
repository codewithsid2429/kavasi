import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const jobId = url.searchParams.get('jobId');

    let query = supabaseAdmin
      .from('Applicants')
      .select('*, Jobs(title)')
      .order('created_at', { ascending: false });

    if (jobId && jobId !== 'all') {
      query = query.eq('job_id', jobId) as typeof query;
    }

    const { data: applicants, error } = await query;
    if (error) throw error;

    // Flatten Jobs.title → jobTitle to match old API shape
    const shaped = (applicants ?? []).map((a: any) => ({
      ...a,
      jobTitle: a.Jobs?.title ?? '',
      Jobs: undefined,
    }));

    return NextResponse.json({ applicants: shaped }, { status: 200 });
  } catch (error) {
    console.error('Error fetching applicants:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
