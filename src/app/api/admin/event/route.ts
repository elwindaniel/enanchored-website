import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Reg from '@/models/reg';

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all documents from the Reg collection
    const registrations = await Reg.find({}).lean(); // Using lean() for performance

    // Set cache control headers to prevent caching
    const headers = new Headers({
      'Cache-Control': 'no-store',  // Disable caching to always get fresh data
    });

    // Return the data as a JSON response
    return NextResponse.json(registrations, { headers, status: 200 });
  } catch (error) {
    console.error('Error fetching data from Reg:', error);

    return NextResponse.json(
      { error: 'Error fetching data' },
      { status: 500 }
    );
  }
}
