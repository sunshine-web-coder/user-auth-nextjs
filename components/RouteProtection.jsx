"use client";
import React from "react";
import { usePathname, redirect } from "next/navigation";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const pathname = usePathname();
  let verify = Cookies.get("accessToken");

  if (verify && pathname === "/" && pathname === "/signup") {
    redirect("/dashboard/user");
  }

  if (!verify && pathname.startsWith("/dashboard")) {
    redirect("/");
  }

  return <>{children}</>;
};

export default ProtectedRoute;
