// /app/api/feedback/route.ts

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Feedback, { IFeedback } from '@/models/feedbackModel';
import { sendEmail } from '@/lib/mailer';

export async function POST(request: Request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the JSON data from the request
    const data: Partial<IFeedback> = await request.json();

    // Define required fields with keyof IFeedback for type safety
    const requiredFields: Array<keyof IFeedback> = [
      'fullName',
      'email',
      'phone',
      'ageGroup',
      'gender',
      'satisfaction',
      'favoriteAspect',
      'spiritualEnrichment',
      'futureEvents',
      'volunteer',
      'programSuggestions',
    ];

    // Initialize an array to collect missing fields
    const missingFields: string[] = [];

    // Validate required fields
    for (const field of requiredFields) {
      if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      console.warn('Missing required fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Ensure multiple-choice fields are arrays
    const multipleFields: Array<keyof IFeedback> = [
      'favoriteAspect',
      'programSuggestions',
    ];

    multipleFields.forEach((field) => {
      if (typeof data[field] === 'string') {
        data[field] = [data[field] as string];
      }
    });

    // Debug: Log the sanitized data
    // console.log('Received feedback data:', data);

    // Create a new feedback entry
    const feedback = await Feedback.create(data);

    // Prepare the confirmation email to the user
    const userEmailData = {
      to: data.email as string,
      subject: 'Thank You for Your Feedback!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body, html { font-family: Arial, sans-serif; padding: 0; margin: 0; }
            .email-container { background-color: #F2F2F2; padding: 20px; }
            .email-content { max-width: 600px; margin: 0 auto; border: 2px solid #DC561E; padding: 20px; }
            .email-footer img { max-width: 100%; height: auto; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-content">
              <p>Hello <strong>${data.fullName}</strong>,</p>
              <p>
                Thank you for taking the time to provide your valuable feedback on our program.
                We greatly appreciate your insights and will use them to improve future events.
              </p>
              <p class="email-signature"><strong>Thank you,<br>The Team</strong></p>
              
              <div class="email-footer">
                <img src="https://www.enanchored.com/_next/image?url=%2Fcamp%2FcampBanner.png&w=384&q=75" alt="Youth Meeting Banner" />
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: 'Thank you for your feedback!',
    };

    // Send the confirmation email to the user
    await sendEmail(userEmailData);

    // Prepare the admin notification email with feedback details
    const adminEmailData = {
      to: 'admin@enanchored.com',
      subject: 'New Feedback Submission',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body, html { font-family: Arial, sans-serif; padding: 20px; margin: 0; }
            .feedback-container { background-color: #F9F9F9; padding: 20px; border: 1px solid #DDD; }
            .feedback-item { margin-bottom: 10px; }
            .feedback-item strong { display: inline-block; width: 150px; }
          </style>
        </head>
        <body>
          <div class="feedback-container">
            <h2>New Feedback Submission</h2>
            <div class="feedback-item"><strong>Full Name:</strong> ${data.fullName}</div>
            <div class="feedback-item"><strong>Email:</strong> ${data.email}</div>
            <div class="feedback-item"><strong>Phone:</strong> ${data.phone}</div>
            <div class="feedback-item"><strong>Age Group:</strong> ${data.ageGroup}</div>
            <div class="feedback-item"><strong>Gender:</strong> ${data.gender}</div>
            <div class="feedback-item"><strong>Satisfaction:</strong> ${data.satisfaction}</div>
            <div class="feedback-item"><strong>Favorite Aspect:</strong> ${Array.isArray(data.favoriteAspect) ? data.favoriteAspect.join(', ') : data.favoriteAspect}</div>
            <div class="feedback-item"><strong>Spiritual Enrichment:</strong> ${data.spiritualEnrichment}</div>
            <div class="feedback-item"><strong>Future Events:</strong> ${data.futureEvents}</div>
            <div class="feedback-item"><strong>Volunteer:</strong> ${data.volunteer}</div>
            <div class="feedback-item"><strong>Program Suggestions:</strong> ${Array.isArray(data.programSuggestions) ? data.programSuggestions.join(', ') : data.programSuggestions}</div>
            <div class="feedback-item"><strong>Additional Comments:</strong> ${data.additionalComments || 'N/A'}</div>
          </div>
        </body>
        </html>
      `,
      text: `New feedback submitted by ${data.fullName}. Please check the attached details.`,
    };

    // Send the feedback details email to the admin
    await sendEmail(adminEmailData);

    // Respond with success
    return NextResponse.json(
      { message: 'Feedback submitted successfully.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      { error: 'An error occurred while submitting feedback.' },
      { status: 500 }
    );
  }
}
