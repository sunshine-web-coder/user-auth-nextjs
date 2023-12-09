import User from "@/models/User";
import connectMongoDB from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// export async function POST(request) {
//   const { name, email, slug, password, profileImage } = await request.json();

//   await connectMongoDB();

//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     return NextResponse.json({ message: "Email is already in use" }, { status: 400 });
//   }  

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({
//     name,
//     email,
//     slug,
//     password: hashedPassword,
//     profileImage,
//   });

//   try {
//     await newUser.save();
//     return NextResponse.json({ message: "User registered successfully!", user: newUser }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(error, { status: 500 });
//   }
// }

export async function POST (request) {
  try {
    const { name, email, slug, password, profileImage } = await request.json();

    const existingUser = await User.findOne({ email }); 

    if (existingUser) {
      return NextResponse.json ({message: 'User already exists.'}, {status: 400});
    }
    
    const hashedPassword = await bcrypt.hash (password, 10);
    await connectMongoDB()
    await User.create ({name, email, slug, password: hashedPassword, profileImage});

    return NextResponse.json ({message: 'You registered successfully!.'}, {status: 200});
  } catch (error) {
    return NextResponse.json (
      {message: 'An error occurred while registering the user.'},
      {status: 500}
    );
  }
}