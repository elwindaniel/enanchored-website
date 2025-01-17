// /app/api/askquestions/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import AskQuestion, { IAskQuestion } from '@/models/askQuestionModel';
// import { sendEmail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the JSON data from the request
    const data: Partial<IAskQuestion> = await request.json();

    // Define required fields
    const requiredFields: Array<keyof IAskQuestion> = ['question'];

    // Initialize an array to collect missing fields
    const missingFields: string[] = [];

    // Validate required fields
    for (const field of requiredFields) {
      if (!data[field] || typeof data[field] !== 'string' || data[field].trim() === '') {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      console.warn('Missing required fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required field(s): ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Optionally, validate email format if provided
    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return NextResponse.json(
          { error: 'Invalid email format.' },
          { status: 400 }
        );
      }
    }

    // Create a new ask question entry
    const askQuestion = await AskQuestion.create(data);

    // Prepare the confirmation email if email is provided


    // Respond with success
    return NextResponse.json(
      { message: 'Your question has been submitted successfully.' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Ask Questions submission error:', error.message || error);
    return NextResponse.json(
      { error: 'An error occurred while submitting your question.' },
      { status: 500 }
    );
  }
}



export async function GET(request: Request) {
    try {
      // Connect to the database
      await dbConnect();
  
      // Fetch all questions, sorted by creation date descending
      const questions = await AskQuestion.find()
        .sort({ createdAt: -1 })
        .lean()
        .exec();
  
      return NextResponse.json({ questions }, { status: 200 });
    } catch (error) {
      console.error('Error fetching questions:', error);
      return NextResponse.json(
        { error: 'An error occurred while fetching questions.' },
        { status: 500 }
      );
    }
  }
  