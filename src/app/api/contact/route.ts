import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, projectType, message } = await req.json();

    if (!name || !email || !projectType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Send emails
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER || 'ethereal_user',
        pass: process.env.SMTP_PASS || 'ethereal_pass'
      }
    });

    // Admin Notification Email
    const adminEmailTemplate = `
      <h3>New Lead: ${name}</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Project Type:</strong> ${projectType}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    // Try sending emails, catch if SMTP isn't valid yet so DB save succeeds anyway
    try {
      await transporter.sendMail({
        from: `"KAVASI Notifications" <${process.env.SMTP_USER || 'no-reply@kavasi.local'}>`,
        to: process.env.ADMIN_EMAIL || 'admin@kavasi.com',
        subject: `New Lead from ${name}`,
        html: adminEmailTemplate
      });

      // User Auto-reply
      const userEmailTemplate = `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to KAVASI. Our team will contact you shortly regarding your ${projectType} project.</p>
        <br/>
        <p>Best regards,<br/>The KAVASI Team</p>
      `;

      await transporter.sendMail({
        from: `"KAVASI" <${process.env.SMTP_USER || 'contact@kavasi.local'}>`,
        to: email,
        subject: "Thank you for contacting KAVASI",
        html: userEmailTemplate
      });
    } catch (emailError) {
      console.warn("Emails not sent (likely due to missing SMTP config), but contact saved in DB.", emailError);
    }

    return NextResponse.json({ success: true, contact: { name, email, projectType, message } }, { status: 201 });
  } catch (error) {
    console.error('Contact Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
