import User from "@/models/User";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectMongoDB();

  try {
    // Fetch all users from the database
    const users = await User.find({}, { password: 0 }); // Exclude the password field

    // Return the list of users in the response
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    // Handle any errors that may occur
    return NextResponse.json(error, { status: 500 });
  }
}
