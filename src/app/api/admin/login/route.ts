import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const { data: admins, error } = await supabaseAdmin
      .from('Admins')
      .select('*')
      .eq('email', email)
      .limit(1);

    if (error) throw error;

    if (admins && admins.length > 0) {
      const admin = admins[0];
      const isValid = await bcrypt.compare(password, admin.password);

      if (isValid) {
        const token = jwt.sign(
          { adminId: admin.id, email: admin.email, name: admin.name },
          process.env.JWT_SECRET || 'fallback_secret_kavasi',
          { expiresIn: '1d' }
        );
        return NextResponse.json(
          { token, user: { email: admin.email, name: admin.name } },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Invalid credentials. Use admin@kavasi.com for demo.' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
