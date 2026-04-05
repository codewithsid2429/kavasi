import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getDbConnection } from '@/lib/db';

function generateApplicationId(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `KAVASI-${num}`;
}

export async function POST(req: Request) {
  try {
    const { jobId, name, email, mobile, portfolio } = await req.json();

    // Validation
    if (!jobId || !name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (mobile) {
      // Must start with 6-9 and total exactly 10 digits
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(mobile)) {
        return NextResponse.json({ error: 'Invalid mobile number. Must be 10 digits starting with 6-9.' }, { status: 400 });
      }
    }

    // Generate unique application ID
    const applicationId = generateApplicationId();

    // Get job title for email
    const db = getDbConnection();
    const [jobRows] = await db.query('SELECT title FROM Jobs WHERE id = ?', [jobId]);
    const jobTitle = (jobRows as any[])[0]?.title || 'the position';

    // Save to DB
    await db.execute(
      'INSERT INTO Applicants (application_id, job_id, name, email, mobile, portfolio) VALUES (?, ?, ?, ?, ?, ?)',
      [applicationId, jobId, name, email, mobile || null, portfolio || '']
    );

    // Send auto-reply email
    try {
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
          <h2 style="color: #00D9FF;">Application Received! 🎉</h2>
          <p style="color: #ccc;">Hi <strong style="color:#fff">${name}</strong>,</p>
          <p style="color: #ccc; line-height: 1.6;">
            Thank you for applying for the <strong style="color:#fff">${jobTitle}</strong> position at <strong style="color:#fff">KAVASI</strong>. We've received your application successfully.
          </p>
          <div style="background: #111; border: 1px solid #00D9FF44; border-radius: 8px; padding: 20px; margin: 24px 0; text-align:center;">
            <p style="margin: 0; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Your Application ID</p>
            <p style="margin: 8px 0 0; font-size: 28px; font-weight: bold; color: #00D9FF; letter-spacing: 2px;">${applicationId}</p>
            <p style="margin: 8px 0 0; color: #555; font-size: 12px;">Save this ID to track your application status</p>
          </div>
          <p style="color: #ccc; line-height: 1.6;">
            Our team will review your application and <strong style="color:#fff">inform you soon</strong>. We aim to respond within <strong style="color:#fff">3–5 business days</strong>.
          </p>
          <p style="color: #ccc;">Best regards,<br/><strong style="color:#fff">The KAVASI Team</strong></p>
        </div>
      `;

      await transporter.sendMail({
        from: `"KAVASI Careers" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Application Received – ${applicationId} | KAVASI`,
        html: emailHtml
      });
    } catch (emailErr) {
      console.warn('Application email not sent (SMTP not configured):', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Application received! We will inform you soon.',
      applicationId
    }, { status: 201 });
  } catch (error) {
    console.error('Job Apply Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
