import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: team, error } = await supabaseAdmin
      .from('TeamMembers')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ team }, { status: 200 });
  } catch (err) {
    console.error('Team GET error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, role, imageUrl, display_order } = await req.json();

    const { data, error } = await supabaseAdmin
      .from('TeamMembers')
      .insert({ name, role, imageUrl, display_order: display_order ?? 0 })
      .select('id')
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, id: data.id }, { status: 201 });
  } catch (err) {
    console.error('Team POST error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
