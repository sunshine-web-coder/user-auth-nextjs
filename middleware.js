import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  // if (request.nextUrl.pathname === "/api/user/getAllUsers") {
  const token = request.headers.get("Authorization");

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Convert the secret key to Uint8Array
    const secretKey = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

    // Await the result of jwtVerify since it returns a Promise
    const decoded = await jwtVerify(token.replace("Bearer ", ""), secretKey, {
      algorithms: ["HS256"],
    });

    console.log("Decoded token payload:", decoded);
    request.tokenPayload = decoded;
    return NextResponse.next();
  } catch (err) {
    console.error("Token verification failed:", err);

    if (err.code === "ERR_JWT_EXPIRED") {
      return NextResponse.json(
        { message: "Token has expired, please login again" },
        { status: 401 },
      );
    }

    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
// }

export const config = {
  matcher: [
    "/api/user/getAllUsers",
    "/api/user/deleteUserById/:path*",
    "/api/user/changePasswordById/:path*",
    "/api/user/getUserBySlug/:path*",
    "/api/user/updateUserById/:path*",
  ],
};
