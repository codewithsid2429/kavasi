import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: projects, error } = await supabaseAdmin
      .from('Projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ projects }, { status: 200 });
  } catch (err) {
    console.error('Projects GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, description, imageUrl, projectLink } = await req.json();

    const { data, error } = await supabaseAdmin
      .from('Projects')
      .insert({ name, description, imageUrl, projectLink: projectLink || '' })
      .select('id')
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (err) {
    console.error('Projects POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
