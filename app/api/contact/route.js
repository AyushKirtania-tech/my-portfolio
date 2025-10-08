import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Validate name length
    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters long' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection('messages');

    // Check for duplicate messages (spam protection)
    const recentMessage = await collection.findOne({
      email: email.toLowerCase().trim(),
      createdAt: { $gte: new Date(Date.now() - 60000) } // Within last minute
    });

    if (recentMessage) {
      return NextResponse.json(
        { error: 'Please wait a moment before sending another message' },
        { status: 429 }
      );
    }

    // Insert message
    const result = await collection.insertOne({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      message: message.trim(),
      createdAt: new Date(),
      read: false,
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    });

    // Send success response
    return NextResponse.json(
      { 
        message: 'Message sent successfully!',
        id: result.insertedId 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Check if it's a MongoDB connection error
    if (error.name === 'MongoServerError' || error.message.includes('ECONNREFUSED')) {
      return NextResponse.json(
        { error: 'Database connection error. Please try again later.' },
        { status: 503 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact me directly via email.' },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to retrieve messages (for admin dashboard)
export async function GET(request) {
  try {
    // Add authentication check here if you want to create an admin panel
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('key');
    
    // Simple authentication (replace with proper auth in production)
    if (adminKey !== process.env.ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db('portfolio');
    const collection = db.collection('messages');

    // Get all messages, sorted by newest first
    const messages = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json(
      { messages },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}