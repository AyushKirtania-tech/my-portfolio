import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Store in MongoDB
    let messageId = null;
    try {
      console.log('Connecting to MongoDB...');
      const client = await clientPromise;
      const db = client.db('portfolio');
      const collection = db.collection('messages');
      
      const document = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        createdAt: new Date(),
        read: false,
      };
      
      const result = await collection.insertOne(document);
      messageId = result.insertedId;
      
      console.log('✅ Message saved to MongoDB:', messageId.toString());
    } catch (dbError) {
      console.error('❌ MongoDB error:', dbError.message);
      // Continue to send email even if DB fails
    }

    // Send email notification
    try {
      console.log('Sending email notification...');
      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `Portfolio Contact: ${name}`,
        text: message,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0b63f0;">New Contact Form Message</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p><strong>From:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              ${messageId ? `<p><strong>Message ID:</strong> ${messageId}</p>` : ''}
            </div>
            <div style="background: white; padding: 20px; border-left: 4px solid #0b63f0; margin: 20px 0;">
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
            <p style="color: #666; font-size: 12px;">Sent from your portfolio website</p>
          </div>
        `,
      });
      
      console.log('✅ Email sent successfully');
    } catch (emailError) {
      console.error('❌ Email error:', emailError.message);
      // If email fails but MongoDB succeeded, still show success
      if (messageId) {
        return NextResponse.json(
          { 
            success: true, 
            message: 'Message saved but email notification failed',
            warning: true 
          },
          { status: 200 }
        );
      }
      throw emailError;
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}