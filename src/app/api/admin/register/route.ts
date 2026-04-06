import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing email, password, or name' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check if admin already exists
    const { data: existing } = await supabaseAdmin
      .from('Admins')
      .select('id')
      .eq('email', email.trim())
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: 'Admin with this email already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabaseAdmin
      .from('Admins')
      .insert({ email: email.trim(), password: hashedPassword, name: name.trim() })
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json(
      { success: true, message: 'New admin successfully added', adminId: data.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Add Admin Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
