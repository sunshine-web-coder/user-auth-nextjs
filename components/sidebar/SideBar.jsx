"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { SideBarLinks } from "@/constants/SideBarLink";
import { LogOutIcon } from "../svgIcons/SvgIcons";
import { usePathname } from "next/navigation";
import useLogout from "../Logout";

export default function SideBar() {
  const pathname = usePathname();
  const { handleLogout } = useLogout();

  return (
    <div className="bg-white fixed z-40 h-screen hidden w-80 border-r pt-10 lg:block">
      <div className="flex min-h-[500px] flex-col gap-2">
        <div className="flex-1">
          <nav className="grid items-start px-4 text-sm font-medium">
            {SideBarLinks.map((link, index) => (
              <Link
                key={index}
                href={link.slug}
                className={`flex items-center gap-3 rounded-lg hover:font-semibold px-3 py-2 text-gray-500 transition-all ${
                  pathname === link.slug ? "bg-gray-900 text-white" : "bg-transparent hover:bg-gray-900/5"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            
          </nav>
          <Button
              className="flex absolute bottom-32 w-full h-14 items-center justify-start gap-3 rounded-lg bg-transparent hover:font-semibold px-3 py-2 text-gray-500 transition-all hover:bg-gray-900/5"
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
