import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDbConnection } from '@/lib/db';

export async function POST(req: Request) {
  try {
    // Note: In production you would probably secure this route with an admin token
    // to prevent unauthorized admin creation
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing email, password, or name' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Encrypt the password before storing for any new admin!
    const hashedPassword = await bcrypt.hash(password, 10);

    const db = getDbConnection();
    
    // Check if admin already exists
    const [existing] = await db.query('SELECT id FROM Admins WHERE email = ?', [email]);
    if ((existing as any[]).length > 0) {
      return NextResponse.json({ error: 'Admin with this email already exists' }, { status: 400 });
    }

    const [result] = await db.execute(
      'INSERT INTO Admins (email, password, name) VALUES (?, ?, ?)',
      [email.trim(), hashedPassword, name.trim()]
    );

    return NextResponse.json({ 
      success: true, 
      message: 'New admin successfully added with an encrypted password',
      adminId: (result as any).insertId 
    }, { status: 201 });

  } catch (error) {
    console.error('Add Admin Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
