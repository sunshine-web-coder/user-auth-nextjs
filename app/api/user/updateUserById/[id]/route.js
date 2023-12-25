import User from "@/models/User";
import connectMongoDB from "@/utils/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  
  // Check if the provided id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid user ID format" }, { status: 400 });
  }

  const { name, phoneNumber, profileImage, social, nationality, bio, dateOfBirth } = await request.json();

  await connectMongoDB();

  try {
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update the fields without changing the slug or email
    user.name = name || user.name;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.profileImage = profileImage || user.profileImage;
    user.nationality = nationality || user.nationality;
    user.bio = bio || user.bio;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;

    // Update social media fields if provided
    if (social) {
      user.social = {
        ...user.social,
        ...social,
      };
    }

    // Save the updated user
    const updatedUser = await user.save();

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}
