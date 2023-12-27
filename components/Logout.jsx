"use client";

import { useDispatch } from "react-redux";
import { logout } from "@/redux/actions";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // Clear cookies on logout
    Cookies.remove("accessToken", { secure: true, sameSite: "strict" });
    Cookies.remove("refreshToken", { secure: true, sameSite: "strict" });

    // Dispatch logout action
    dispatch(logout());

    // Redirect to home page
    router.push("/");
  };

  return {
    handleLogout,
  };
};

export default useLogout;
