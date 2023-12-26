"use client";

import {
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import useLogout from "../Logout";

export default function UserAvatar() {
  const user = useSelector((state) => state.auth.user);
  const { handleLogout } = useLogout();
  
  return (
    <div className="ml-[20px] flex items-center gap-4">
      <Popover showArrow={true} placement="bottom-end">
        <PopoverTrigger>
          <Avatar
            isBordered
            as="button"
            className="h-8 w-8 transition-transform"
            src={user?.profileImage}
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex w-[200px] flex-col p-2">
            <p className="font-semibold">Signed in as</p>
            <p className="mt-1 font-semibold">{user?.name}</p>
            <p className="mt-1 font-semibold">
              {user?.email && "@" + user?.email.split("@")[0]}
            </p>
            <hr className="mb-3 mt-3" />
            <Button
              className="flex h-[35px] items-start justify-start rounded-md bg-transparent p-2 text-left hover:bg-[#EA454C]/10 hover:font-semibold"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
