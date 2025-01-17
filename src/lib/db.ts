import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Add the mongoose cache to the global type
declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

async function dbConnect(): Promise<Mongoose> {
  // If there’s already an established connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If there’s no promise for a connection, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset the promise if the connection failed
    throw e;
  }

  global.mongoose = cached; // Ensure the cache is stored globally

  return cached.conn!;
}

export default dbConnect;
