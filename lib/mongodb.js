// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  // Recommended options; modern drivers don't always need these,
  // but they are safe defaults and help with older drivers/hosts.
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
