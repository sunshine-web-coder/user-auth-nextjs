import { sendEmail } from "@/helpers/mailer";
import User from "@/models/User";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectMongoDB();

  try {
    const reqBody = await request.json();

    const { email } = reqBody;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User with this email not found!" },
        { status: 400 },
      );
    }

    // Send verification email
    await sendEmail({ email, emailType: "RESET", id: existingUser._id });

    return NextResponse.json(
      { message: "Check your email for a link to reset your password" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while sending the password reset link." },
      { status: 500 },
    );
  }
}
