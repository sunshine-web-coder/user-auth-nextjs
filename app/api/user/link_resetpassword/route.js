import sendForgotPasswordEmail from "@/helpers/mailer/passwordReset";
import User from "@/models/User";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectMongoDB();

  try {
    const { email } = await request.json();

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User with this email not found!" },
        { status: 400 },
      );
    }

    // Call the sendForgotPasswordEmail function
    await sendForgotPasswordEmail(email);

    return NextResponse.json(
      { message: "Reset password email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while sending the password reset link." },
      { status: 500 },
    );
  }
}