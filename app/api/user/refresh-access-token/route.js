import connectMongoDB from "@/utils/db";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectMongoDB();

  try {
    const { refreshToken } = request.body;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token not provided" },
        { status: 401 }
      );
    }

    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "5m" },
    );

    return NextResponse.json(
      { accessToken: newAccessToken, expiresIn: 900 },
      { status: 200 },
    );
  } catch (error) {
    // Handle token verification or other errors
    console.error("Error during token refresh:", error);
    return NextResponse.json(
      { message: "Invalid refresh token", error },
      { status: 401 },
    );
  }
}
