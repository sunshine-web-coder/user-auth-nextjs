"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { SideBarLinks } from "@/constants/SideBarLink";
import { CloseIcon, LogOutIcon } from "../svgIcons/SvgIcons";
import { usePathname } from "next/navigation";
import useLogout from "../Logout";

export default function MobileMenu({ isOpen, isClose }) {
  const pathname = usePathname();
  const { handleLogout } = useLogout();

  return (
    <div className={`bg-white fixed left-0 top-0 z-40 h-screen w-80 border-r pt-2 lg:hidden ${isOpen ? '' : 'hidden'}`}>
      <div className="flex justify-between px-4 pb-10 pt-5">
        <Link href="/dashboard/user">
          <h1 className="text-lg font-semibold">EaxyAUTH</h1>
        </Link>
        <CloseIcon onClick={isClose} />
      </div>
      <div className="flex min-h-[500px] flex-col gap-2">
        <div className="flex-1">
          <nav className="grid items-start px-4 text-sm font-medium">
            {SideBarLinks.map((link, index) => (
              <Link
                key={index}
                href={link.slug}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:font-semibold ${
                  pathname === link.slug
                    ? "bg-gray-900 text-white"
                    : "bg-transparent hover:bg-gray-900/5"
                }`}
                onClick={isClose}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
          <Button
            className="absolute bottom-10 flex h-14 w-full items-center justify-start gap-3 rounded-lg bg-transparent px-3 py-2 text-gray-500 transition-all hover:bg-gray-900/5 hover:font-semibold"
            onClick={handleLogout}
          >
            <LogOutIcon />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
