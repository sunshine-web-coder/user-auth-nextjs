import User from "@/models/User";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json("Slug parameter is missing", { status: 400 });
  }

  await connectMongoDB();

  try {
    // Fetch the user by slug from the database
    const user = await User.findOne({ slug }, { password: 0 }); // Exclude the password field

    // If the user is not found, return a 404 response
    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    // Return the user data in the response
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    // Handle any errors that may occur
    return NextResponse.json(error, { status: 500 });
  }
}


