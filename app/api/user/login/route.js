import sendEmail from "@/helpers/mailer/EmailVerify";
import User from "@/models/User";
import connectMongoDB from "@/utils/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, password } = await request.json();

  await connectMongoDB();

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If the user does not exist, return an error
    if (!user) {
      return NextResponse.json ({message: 'Invalid credentials'}, {status: 401});
    }

    // Check if the email is verified
    if (!user.isEmailVerified) {
      // Resend verification email
      await sendEmail(email);

      return NextResponse.json ({message: 'Email not verified'}, {status: 401});
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is not valid, return an error
    if (!isPasswordValid) {
      return NextResponse.json ({message: 'Invalid credentials'}, {status: 401});
    }

    // Exclude the password from the user data
    const { password: _, ...userDataWithoutPassword } = user.toObject();

    // Generate an access token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "1h", // Set the expiration time for the access token
      },
    );

    // Generate a refresh token
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
    );

    // Save the refresh token in the user document (you may want to store it securely, like in a separate collection)
    user.refreshToken = refreshToken;
    await user.save();

    // Return the access and refresh tokens in the response
    return NextResponse.json(
      {
        accessToken,
        refreshToken,
        user: userDataWithoutPassword, // Include necessary user data
        message: "Login successful!",
      },
      { status: 200 },
    );
  } catch (error) {
    // Handle any other errors that may occur
    return NextResponse.json(error, { status: 500 });
  }
}
