import User from "@/models/User";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { name, email, profileImage } = await request.json();

  await connectMongoDB()

  try {

    const user = await User.findByIdAndUpdate(
      id,
      { name, email, profileImage },
      { new: true },
    );

    // Check if the user is the owner of the account
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: "Unauthorized. You are not the owner of this account." },
          { status: 404 },
        );
      }
    }

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update the fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.profileImage = profileImage || user.profileImage;

    // Update the slug if the email is provided
    if (email && email !== user.email) {
      const emailParts = email.split("@");
      const formattedEmail = emailParts[0];
      user.slug = formattedEmail;
    }

    // Save the updated user
    await user.save();

    return NextResponse.json(
      { message: "Profile updated successfully", user },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
