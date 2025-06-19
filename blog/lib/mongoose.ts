// lib/mongoose.ts
import mongoose from 'mongoose'

const MONGODB_URI = process.env.DATABASE_URL as string

if (!MONGODB_URI) throw new Error('DATABASE_URL is missing in .env')

let cached = (global as any).mongoose || { conn: null, promise: null }

export async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then(m => {
      return m
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
