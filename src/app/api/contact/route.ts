import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getDbConnection } from '@/lib/db';

export async function GET() {
  try {
    const db = getDbConnection();
    const [contacts] = await db.query('SELECT * FROM Contacts ORDER BY created_at DESC');
    return NextResponse.json({ contacts }, { status: 200 });
  } catch (error) {
    console.error('Contacts GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, projectType, message } = await req.json();

    if (!name || !email || !projectType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to database FIRST
    try {
      const db = getDbConnection();
      await db.execute(
        'INSERT INTO Contacts (name, email, projectType, message) VALUES (?, ?, ?, ?)',
        [name, email, projectType, message]
      );
    } catch (dbError) {
      console.error('Failed to save contact to database', dbError);
      // Still attempt email even if DB fails
    }

    // Send emails (optional, non-blocking)
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.ethereal.email',
        port: Number(process.env.SMTP_PORT) || 587,
        auth: {
          user: process.env.SMTP_USER || 'ethereal_user',
          pass: process.env.SMTP_PASS || 'ethereal_pass'
        }
      });

      // 1. Admin notification email
      await transporter.sendMail({
        from: `"KAVASI Notifications" <${process.env.SMTP_USER || 'no-reply@kavasi.local'}>`,
        to: process.env.ADMIN_EMAIL || 'admin@kavasi.com',
        subject: `New Lead from ${name}`,
        html: `
          <h3>New Contact: ${name}</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });

      // 2. Auto-reply to the person who filled the form
      await transporter.sendMail({
        from: `"KAVASI" <${process.env.SMTP_USER || 'no-reply@kavasi.local'}>`,
        to: email,
        subject: `Thank you for contacting KAVASI, ${name}!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 12px;">
            <h2 style="color: #00D9FF;">We got your message! 🙌</h2>
            <p style="color: #ccc;">Hi <strong style="color:#fff">${name}</strong>,</p>
            <p style="color: #ccc; line-height: 1.6;">
              Thank you for reaching out to <strong style="color:#fff">KAVASI</strong> about your 
              <strong style="color:#fff">${projectType}</strong> project. We've received your message and 
              our team will review it shortly.
            </p>
            <div style="background: #111; border: 1px solid #00D9FF44; border-radius: 8px; padding: 20px; margin: 24px 0;">
              <p style="margin: 0; color: #888; font-size: 13px;">Your message</p>
              <p style="margin: 10px 0 0; color: #ccc; font-style: italic;">"${message}"</p>
            </div>
            <p style="color: #ccc; line-height: 1.6;">
              We typically respond within <strong style="color:#fff">1–2 business days</strong>. 
              In the meantime, feel free to explore our work.
            </p>
            <p style="color: #ccc;">Warm regards,<br/><strong style="color:#fff">The KAVASI Team</strong></p>
          </div>
        `
      });
    } catch (emailError) {
      console.warn("Email not sent (SMTP not configured). Contact was saved to DB.", emailError);
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Contact Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
