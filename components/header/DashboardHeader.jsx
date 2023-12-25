"use client";

import Link from "next/link";
import { MenuIcon } from "../svgIcons/SvgIcons";
import UserAvatar from "./UserAvatar";
import { useSelector } from "react-redux";

export default function DashboardHeader() {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="fixed top-0 z-50 flex h-14 w-full items-center justify-between gap-4 border-b bg-white px-6">
      <div>
        <div className="lg:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </div>
        <Link href="/dashboard/user">
          <h1 className="text-lg font-semibold">EaxyAUTH</h1>
        </Link>
      </div>

      <div className="flex items-center">
        <span>Welcome, {user?.name}</span>
        <UserAvatar />
      </div>
    </header>
  );
}
