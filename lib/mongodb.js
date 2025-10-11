// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

// Modern MongoDB driver options for version 6.x
const options = {
  tls: true,
  tlsAllowInvalidCertificates: false, // Set to true only if you have certificate issues
  serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 2,
  retryWrites: true,
  retryReads: true,
  connectTimeoutMS: 10000,
};

let client;
let clientPromise;

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// In development, use a global variable so HMR doesn't create multiple connections.
if (process.env.NODE_ENV === 'development') {
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  // In production, it's fine to create a new client for the server instance.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;