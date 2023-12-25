import User from "@/models/User";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await connectMongoDB();

  try {
    const { token, password } = await request.json();
    
    // Find the user by the reset token
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      console.error("Invalid or expired reset token:", {
        token,
        currentTime: Date.now(),
        userExpiry: user?.forgotPasswordExpiry,
      });
    
      return NextResponse.json(
        { message: "Invalid or expired reset token" },
        { status: 400 },
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();
    
    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { message: "An error occurred while resetting the password" },
      { status: 500 },
    );
  }
}
