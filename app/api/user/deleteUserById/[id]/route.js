import User from "@/models/User";
import connectMongoDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  
  const { id } = params;

  await connectMongoDB()

  try {

    const result = await User.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
