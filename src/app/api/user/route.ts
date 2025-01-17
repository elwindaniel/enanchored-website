import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { sendEmail } from "@/lib/mailer";

const SECRET_KEY = process.env.JWT_SECRET_KEY as string;

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    // Parse request body
    const { email, name, role, password } = await req.json();
    console.log(email, name, role, password);

    // Validate input
    if (!email || !name || !role || !password) {
      return NextResponse.json(
        { error: "Email, name, role, and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = new User({
      email,
      name,
      role,
      password: hashedPassword,
    });
    console.log(newUser);
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Set token in HTTP-only cookie
    const response = NextResponse.json({
      message: "User registered successfully",
    });
    response.cookies.set("token", token, { httpOnly: true });
    const createPasswordLink = `https://enanchored.com/create-password?token=${token}`;

    const emailData = {
      to: email,
      subject: "Welcome to Enanchored",
      html: `<!DOCTYPE html>
      <html>
      <body style="margin:0; padding:0; background-color:#F2F2F2; font-family: Arial, sans-serif;">
        <div style="max-width:600px; margin:0 auto; background-color:#FFFFFF;">
          <!-- Header -->
          <div style="background-color:#f2f2f2; padding:20px; text-align:center;">
            <!-- SVG Image -->
            <div style="margin-bottom:8px; display:flex;justify-items:center; align-items:center">
              <h2 style="color:#000; margin:0;">Welcome to Enanchored</h2>
            </div>
          </div>
          <!-- Content -->
          <div style="padding:20px; color:#000000;">
            <p>Hello ${name},</p>
            <p>We are pleased to inform you that you have been added to the board. Welcome aboard!</p>
            <p>Please verify your email address by clicking the button below:</p>
            <div style="text-align:center; margin:20px 0;">
              <a href="${createPasswordLink}" style="background-color:#D6001C; color:#FFFFFF; padding:15px 25px; text-decoration:none; border-radius:5px; display:inline-block;">Verify Email</a>
            </div>
          </div>
          <!-- Footer -->
          <div style="background-color:#F2F2F2; padding:10px; color:#000000; font-size:12px; text-align:center;">
            <p>If you did not request this, please ignore this email.</p>
          </div>
        </div>
      </body>
      </html>`,
      text: "",
    };
    await sendEmail(emailData);

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
