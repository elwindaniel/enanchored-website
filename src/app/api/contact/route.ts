import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Reg from '@/models/contact';
// import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const data = await req.json();
    const reg = await Reg.create(data);

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'An error occurred during registration' }, { status: 500 });
  }
}