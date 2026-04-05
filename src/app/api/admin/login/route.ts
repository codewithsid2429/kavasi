import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getDbConnection } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const db = getDbConnection();
    
    const [rows] = await db.query('SELECT * FROM Admins WHERE email = ?', [email]);
    const admins = rows as any[];

    if (admins.length > 0) {
      const admin = admins[0];
      const isValid = await bcrypt.compare(password, admin.password);

      if (isValid) {
        const token = jwt.sign(
          { adminId: admin.id, email: admin.email, name: admin.name }, 
          process.env.JWT_SECRET || 'fallback_secret_kavasi', 
          { expiresIn: '1d' }
        );
        return NextResponse.json({ token, user: { email: admin.email, name: admin.name } }, { status: 200 });
      }
    }

    return NextResponse.json({ error: 'Invalid credentials. Use admin@kavasi.com / ewqasdcxz for demo if reset.' }, { status: 401 });
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
