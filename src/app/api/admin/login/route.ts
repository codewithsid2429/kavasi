import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Mock Login Logic to bypass Localhost DB constraints for demo
    if (email === 'admin@kavasi.com' && password === 'ewqasdcxz') {
      const token = jwt.sign(
        { adminId: 'mock_1', email: 'admin@kavasi.com', name: 'Siddhartha' }, 
        process.env.JWT_SECRET || 'fallback_secret_kavasi', 
        { expiresIn: '1d' }
      );
      return NextResponse.json({ token, user: { email: 'admin@kavasi.com', name: 'Mock Admin' } }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid credentials. Use admin@kavasi.com / ewqasdcxz.' }, { status: 401 });
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
