import User from "@/models/User";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectMongoDB()

  try {
    const reqBody = await request.json();

    const { token } = reqBody;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid token or Email is already verified" }, { status: 400 });
    }

    // Mark the email as verified
    user.isEmailVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    // Save the user changes
    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
