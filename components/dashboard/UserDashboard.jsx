"use client";

import { socialLinks } from "@/constants";
import { Avatar, Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function UserDashboard() {
  const user = useSelector((state) => state.auth.user);
  const [isBioCollapsed, setBioCollapsed] = useState(true);

  const toggleBio = () => {
    setBioCollapsed((prev) => !prev);
  };
  return (
    <div className="grid w-full overflow-hidden">
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <h5 className="border-b pb-2 text-lg">Dashboard</h5>
          <div className="flex flex-col items-center rounded-lg border p-4 py-8">
            <div>
              <Avatar
                isBordered
                as="button"
                className="h-[100px] w-[100px] transition-transform"
                src={user?.profileImage}
              />
            </div>
            <p className="mt-3">{user?.name}</p>

            {user?.profession && (
              <p className="mt-3 text-center">{user?.profession}</p>
            )}

            {user?.bio && (
              <div
                className={`mx-auto mb-3 mt-3 max-w-lg overflow-hidden text-center text-sm ${
                  isBioCollapsed ? "max-h-16" : "max-h-96"
                } transition-max-height duration-300 ease-in-out`}
              >
                {user?.bio}
              </div>
            )}
            {user?.bio?.length > 100 && (
              <button
                className="font-semibold text-blue-500 hover:underline"
                onClick={toggleBio}
              >
                {isBioCollapsed ? "Read more" : "Read less"}
              </button>
            )}
            <div className="mt-3 flex items-center gap-3">
              {socialLinks.map((link) => (
                <React.Fragment key={link.key}>
                  {user?.social?.[link.key] && (
                    <div key={link.key}>
                      <a target="_blank" href={user?.social?.[link.key]}>
                        {user?.social?.[link.key] && link.icon}
                      </a>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="mt-4">
              <Button
                color="primary"
                className="bg-[#EA454C]"
                as={Link}
                href="/dashboard/user/profile"
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
