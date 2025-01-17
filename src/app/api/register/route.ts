import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Reg from "@/models/reg";
import { sendEmail } from "@/lib/mailer";
// import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    await dbConnect();

    const data = await req.json();
    const reg = await Reg.create(data);

    const emailData = {
      to: data.email,
      subject: "Enanchored Youth Meeting! See You on 26 October 2024!",
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
              <p>Hello <strong>${data.firstName + " " + data.surName}</strong>,</p>
              <p>
                We are thrilled to have you join us for the <b>Enanchored Youth Meeting on 26 October 2024 at Seaham Youth Centre, SR7 8QE</b>. 
                The event will run from 09:30 AM to 04:00 PM, and we’ve got an exciting day planned for you.
                <br/><br/>
                Not only will there be powerful sessions and opportunities to connect, but we will also be providing food to keep you fueled throughout the day.
                <br/><br/>
                Come expectant, come hungry, and come ready to be blessed. We can’t wait to see you there!
              </p>

              <p class="email-signature"> <strong>Thank you,<br>Enanchored Team </strong></p>
              
              <div class="email-footer">
                <img src="https://www.enanchored.com/_next/image?url=%2Fcamp%2FcampBanner.png&w=384&q=75" alt="Youth Meeting Banner" />
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      text: "",
    };

    const email = sendEmail(emailData);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An error occurred during registration" },
      { status: 500 }
    );
  }
}
