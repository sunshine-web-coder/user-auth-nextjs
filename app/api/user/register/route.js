import { sendEmail } from "@/helpers/mailer";
import User from "@/models/User";
import connectMongoDB from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST (request) {
  await connectMongoDB()

  try {
    const { name, email, slug, password, profileImage } = await request.json();

    const existingUser = await User.findOne({ email }); 

    if (existingUser) {
      return NextResponse.json ({message: 'User already exists.'}, {status: 400});
    }
    
    const hashedPassword = await bcrypt.hash (password, 10);
    const createUser = await User.create ({name, email, slug, password: hashedPassword, profileImage});

    //send verification email
    await sendEmail ({email, emailType: "VERIFY", id: createUser._id})

    return NextResponse.json ({message: 'You registered successfully! Check your email for a verification link..'}, {status: 200});
  } catch (error) {
    return NextResponse.json (
      {message: 'An error occurred while registering the user.'},
      {status: 500}
    );
  }
}