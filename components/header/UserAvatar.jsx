'use client';

import React, {useState} from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  User,
  Switch,
  DropdownSection,
  Button,
} from '@nextui-org/react';
import {HiSun, HiMoon} from 'react-icons/hi2';
import Link from 'next/link';
// import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/navigation';
// import { logout } from '@/redux/authReducer';

export default function UserAvatar () {
  // const dispatch = useDispatch ();
  // const user = useSelector (state => state.user);

  const [darkMode, setDarkMode] = useState (false); // Initialize dark mode state

  const router = useRouter ();
  const toggleDarkMode = () => {
    setDarkMode (!darkMode); // Toggle the dark mode state
    // You can also save the dark mode state in local storage or a context API here.
  };

  // const handleLogout = () => {
  //   dispatch (logout ());
  //   router.push ('/auth/login');
  // };

  return (
    <div className="ml-[20px] flex items-center gap-4">
      <Popover showArrow={true} placement="bottom-end">
        <PopoverTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src=""
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="w-[200px] flex flex-col p-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold mt-2">
              name
            </p>
            <p className="font-semibold">
              email
            </p>
            <hr className="mt-3 mb-3" />
            <Link
              href={`/author/`}
              className="p-2 rounded-md hover:bg-gray-100 hover:font-semibold"
            >
              Profile
            </Link>
            <Link
              href="/my-posts"
              className="p-2 rounded-md hover:bg-gray-100 hover:font-semibold"
            >
              My Posts
            </Link>
            <div className="flex mt-2 items-center justify-between pl-2">
              <p> Dark Mode</p>
              <Switch
                defaultSelected
                size="sm"
                color="primary"
                startContent={<HiSun />}
                endContent={<HiMoon />}
              />
            </div>
            <Button
              className="p-2 h-[35px] text-left flex items-start justify-start hover:font-semibold mt-2 bg-transparent rounded-md hover:bg-gray-200"
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
