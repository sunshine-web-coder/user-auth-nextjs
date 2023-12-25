import sendEmail from "@/helpers/mailer/EmailVerify";
import User from "@/models/User";
import AvatarGenerator from "@/utils/AvatarGenerator";
import connectMongoDB from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectMongoDB();

  try {
    const {
      name,
      email,
      slug,
      password,
      profileImage
    } = await request.json();

    // Use the provided avatar or generate a random default avatar
    const userAvatar = profileImage || AvatarGenerator();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already in use. Please use a different email." },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      slug,
      password: hashedPassword,
      profileImage: userAvatar
    });

    //send verification email
    await sendEmail(email);

    return NextResponse.json(
      {
        message:
          "You registered successfully! Check your email for a verification link..",
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 },
    );
  }
}
