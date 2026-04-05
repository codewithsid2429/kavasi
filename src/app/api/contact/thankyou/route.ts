import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getDbConnection } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { contactId, name, email, projectType } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 12px;">
        <h2 style="color: #00D9FF;">Thank You, ${name}! 🙏</h2>
        <p style="color: #ccc; line-height: 1.6;">
          We received your message regarding your <strong style="color:#fff">${projectType}</strong> project and we truly appreciate you taking the time to reach out to <strong>KAVASI</strong>.
        </p>
        <p style="color: #ccc; line-height: 1.6;">
          Our team is reviewing your inquiry and will get back to you within <strong style="color:#fff">1–2 business days</strong> with a tailored response.
        </p>
        <div style="background: #111; border: 1px solid #333; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <p style="margin: 0; color: #888; font-size: 14px;">In the meantime, feel free to explore our portfolio at</p>
          <a href="https://kavasi.dev" style="color: #00D9FF;">kavasi.dev</a>
        </div>
        <p style="color: #ccc;">Warm regards,<br/><strong style="color:#fff">The KAVASI Team</strong></p>
      </div>
    `;

    await transporter.sendMail({
      from: `"KAVASI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thank you for contacting KAVASI, ${name}!`,
      html: emailHtml
    });

    // Mark contact as 'replied' in DB
    if (contactId) {
      const db = getDbConnection();
      await db.execute("UPDATE Contacts SET status = 'replied' WHERE id = ?", [contactId]);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Thank You Email Error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
