import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: jobs, error } = await supabaseAdmin
      .from('Jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
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

    const { data, error } = await supabaseAdmin
      .from('Jobs')
      .insert({ title, type, description })
      .select('id')
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, jobId: data.id }, { status: 201 });
  } catch (error) {
    console.error('Error posting job:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
