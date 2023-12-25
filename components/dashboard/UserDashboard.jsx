"use client";

import { Avatar } from "@nextui-org/react";
import { useSelector } from "react-redux";

export default function UserDashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="grid h-screen min-h-screen w-full overflow-hidden">
      <div className="flex flex-col border">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <h5 className="text-lg border-b pb-2">Dashboard</h5>
        </main>
      </div>
    </div>
  );
}
