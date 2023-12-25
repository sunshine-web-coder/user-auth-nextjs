import {
  HomeIcon,
  ChangePasswordIcon,
  SettingsIcon,
  UserIcon,
  SocialLinksIcon,
} from "@/components/svgIcons/SvgIcons";

export const SideBarLinks = [
  {
    label: "Home",
    icon: <HomeIcon />,
    slug: "/dashboard/user",
  },
  {
    label: "Profile",
    icon: <UserIcon />,
    slug: "/dashboard/user/profile",
  },
  {
    label: "Change Password",
    icon: <ChangePasswordIcon />,
    slug: "/dashboard/user/change-password",
  },
  // {
  //   label: "Settings",
  //   icon: <SettingsIcon />,
  //   slug: "/dashboard/user/settings",
  // },
];
