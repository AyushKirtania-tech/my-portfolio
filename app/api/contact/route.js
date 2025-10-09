// app/api/contact/route.js
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import nodemailer from 'nodemailer';

/**
 * POST /api/contact
 * Body: { name, email, message }
 * - saves message to MongoDB
 * - sends notification email if SMTP_* env vars are present
 */
export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name = '', email = '', message = '' } = body;

    // Normalize and basic validation
    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedMessage = String(message).trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (trimmedName.length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters long' }, { status: 400 });
    }
    if (trimmedMessage.length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters long' }, { status: 400 });
    }
    if (trimmedMessage.length > 5000) {
      return NextResponse.json({ error: 'Message too long' }, { status: 400 });
    }

    // Connect to MongoDB and collection
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB_NAME || 'portfolio';
    const db = client.db(dbName);
    const collection = db.collection('messages');

    // Anti-spam: check last message timestamp for same email
    const last = await collection.findOne(
      { email: trimmedEmail },
      { sort: { createdAt: -1 } }
    );

    if (last && last.createdAt) {
      const deltaMs = Date.now() - new Date(last.createdAt).getTime();
      const minIntervalMs = 60 * 1000; // 1 minute
      if (deltaMs < minIntervalMs) {
        return NextResponse.json({ error: 'Please wait a moment before sending another message' }, { status: 429 });
      }
    }

    // Client metadata
    const ipHeader = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    const ip = ipHeader.split(',')[0].trim() || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Insert the message
    const insertResult = await collection.insertOne({
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      createdAt: new Date(),
      read: false,
      ip,
      userAgent,
    });

    const insertedId = String(insertResult.insertedId);

    // Attempt to send notification email if SMTP config exists
    const smtpHost = process.env.SMTP_HOST || '';
    const smtpPort = Number(process.env.SMTP_PORT || 0);
    const smtpUser = process.env.SMTP_USER || '';
    const smtpPass = process.env.SMTP_PASS || '';
    const contactTo = process.env.CONTACT_TO || smtpUser || null;
    const contactFrom = process.env.CONTACT_FROM || smtpUser || `no-reply@${process.env.MAIL_DOMAIN || 'localhost'}`;

    let emailSent = false;
    let emailError = null;

    if (smtpHost && smtpPort && smtpUser && smtpPass && contactTo) {
      try {
        const secure = String(process.env.SMTP_SECURE || '').toLowerCase() === 'true' || smtpPort === 465;
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: secure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailSubject = `Portfolio contact — ${trimmedName} <${trimmedEmail}>`;
        const mailText = `New contact form message

Name: ${trimmedName}
Email: ${trimmedEmail}
Message:
${trimmedMessage}

--- meta
id: ${insertedId}
ip: ${ip}
userAgent: ${userAgent}
time: ${new Date().toISOString()}
`;

        const mailHtml = `
          <h2>New contact form message</h2>
          <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(trimmedEmail)}">${escapeHtml(trimmedEmail)}</a></p>
          <p><strong>Message:</strong></p>
          <div style="white-space:pre-wrap;border-left:3px solid #eee;padding-left:12px;margin:8px 0;color:#111;">${escapeHtml(trimmedMessage)}</div>
          <hr/>
          <p><small>id: ${insertedId}</small></p>
          <p><small>ip: ${escapeHtml(ip)}</small></p>
          <p><small>userAgent: ${escapeHtml(userAgent)}</small></p>
          <p><small>time: ${new Date().toISOString()}</small></p>
        `;

        await transporter.sendMail({
          from: contactFrom,
          to: contactTo,
          subject: mailSubject,
          text: mailText,
          html: mailHtml,
        });

        emailSent = true;
      } catch (err) {
        console.error('Email send error:', err);
        emailError = String(err?.message || err);
        // do not fail the whole request — DB save succeeded, so we'll still return success
      }
    } else {
      // SMTP not set up — skip email send
      emailSent = false;
    }

    return NextResponse.json(
      {
        message: 'Message saved successfully.',
        id: insertedId,
        emailSent,
        emailError,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Contact form POST error:', err);
    if (err.name === 'MongoServerError' || String(err).includes('ECONNREFUSED')) {
      return NextResponse.json({ error: 'Database connection error. Please try again later.' }, { status: 503 });
    }
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
  }
}

/**
 * Simple HTML escaper for safety when composing HTML emails.
 */
function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

/**
 * GET /api/contact?key=ADMIN_KEY
 * - returns recent messages (admin)
 */
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const adminKey = url.searchParams.get('key') || '';

    if (!process.env.ADMIN_KEY || adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME || 'portfolio');
    const collection = db.collection('messages');

    const messages = await collection.find({}).sort({ createdAt: -1 }).limit(50).toArray();

    const sanitized = messages.map(m => ({
      id: String(m._id),
      name: m.name,
      email: m.email,
      message: m.message,
      createdAt: m.createdAt ? new Date(m.createdAt).toISOString() : null,
      read: !!m.read,
      ip: m.ip || null,
      userAgent: m.userAgent || null,
    }));

    return NextResponse.json({ messages: sanitized }, { status: 200 });
  } catch (err) {
    console.error('Contact form GET error:', err);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
