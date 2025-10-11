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
      console.log('📝 Connecting to MongoDB...');
      const client = await clientPromise;
      const db = client.db('portfolioDB');
      const collection = db.collection('contacts');
      
      const document = {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        createdAt: new Date(),
        read: false,
      };
      
      const result = await collection.insertOne(document);
      messageId = result.insertedId;
      
      console.log('✅ Message saved to MongoDB with ID:', messageId.toString());
    } catch (dbError) {
      console.error('❌ MongoDB error:', dbError.message);
      // Continue to send email even if DB fails
    }

    // Send email notification
    try {
      console.log('📧 Sending email notification...');
      
      // Verify email credentials exist
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
        throw new Error('Email credentials not configured');
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      // Verify transporter configuration
      await transporter.verify();
      console.log('✅ Email transporter verified');

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to yourself
        replyTo: email,
        subject: `Portfolio Contact: ${name}`,
        text: `New message from ${name} (${email}):\n\n${message}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
              .header h1 { margin: 0; font-size: 24px; }
              .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
              .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea; }
              .message-box { background: white; padding: 25px; border-radius: 8px; margin: 20px 0; border: 2px solid #e0e0e0; }
              .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
              .label { font-weight: bold; color: #667eea; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📬 New Contact Form Message</h1>
              </div>
              <div class="content">
                <div class="info-box">
                  <p><span class="label">From:</span> ${name}</p>
                  <p><span class="label">Email:</span> <a href="mailto:${email}">${email}</a></p>
                  <p><span class="label">Date:</span> ${new Date().toLocaleString('en-IN', { 
                    timeZone: 'Asia/Kolkata',
                    dateStyle: 'full',
                    timeStyle: 'short'
                  })}</p>
                  ${messageId ? `<p><span class="label">Message ID:</span> ${messageId}</p>` : ''}
                </div>
                
                <div class="message-box">
                  <p style="margin: 0; white-space: pre-wrap; word-wrap: break-word;">${message}</p>
                </div>
                
                <div class="footer">
                  <p>This message was sent from your portfolio website contact form</p>
                  <p>Reply directly to this email to respond to ${name}</p>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Email sent successfully to:', process.env.EMAIL_USER);
    } catch (emailError) {
      console.error('❌ Email error:', emailError.message);
      
      // If email fails but MongoDB succeeded, still show partial success
      if (messageId) {
        return NextResponse.json(
          { 
            success: true, 
            message: 'Message saved but email notification failed. Please check your email settings.',
            warning: true 
          },
          { status: 200 }
        );
      }
      
      // If both failed, throw error
      throw new Error('Failed to send email: ' + emailError.message);
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message sent successfully! I will get back to you soon.',
        messageId: messageId?.toString()
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Contact form error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}