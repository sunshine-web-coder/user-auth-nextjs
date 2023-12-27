"use client";

import { Button, Input } from "@nextui-org/react";
import axios from "axios";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/actions";
import { toast } from "react-toastify";
import useLogout from "../Logout";
import { updateUserById } from "@/constants/ApiService";
import Cookies from "js-cookie";

export default function EditSocial({ handleDrawerClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const accessToken = Cookies.get("accessToken")
  const { handleLogout } = useLogout();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Use updateUserById instead of axios.put
      const response = await updateUserById( user._id, { social: data }, accessToken );

      dispatch(updateUser(response.user));

      toast.success("Social updated successfully");
      setIsLoading(false);
      handleDrawerClose();
    } catch (error) {
      if (error?.response?.status === 401) {
        if (
          error?.response?.data?.message ===
          "Token has expired, please login again"
        ) {
          toast.error("Token has expired, please login again");
          handleLogout();
        }
      } else {
        console.error("An error occurred:", error);
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4 md:space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 md:space-y-3">
        <Input
          {...register("facebook")}
          label="Facebook"
          placeholder="https://facebook.com/"
          defaultValue={user?.social?.facebook}
          type="text"
          variant="bordered"
        />
        <Input
          {...register("twitter")}
          label="Twitter"
          placeholder="https://twitter.com"
          defaultValue={user?.social?.twitter}
          type="text"
          variant="bordered"
        />
        <Input
          {...register("instagram")}
          label="Instagram"
          placeholder="https://instagram.com"
          defaultValue={user?.social?.instagram}
          type="text"
          variant="bordered"
        />
        <Input
          {...register("linkedIn")}
          label="LinkedIn"
          placeholder="https://linkedin.com"
          defaultValue={user?.social?.linkedin}
          type="text"
          variant="bordered"
        />
        <Input
          {...register("github")}
          label="Github"
          placeholder="https://github.com"
          defaultValue={user?.social?.github}
          type="text"
          variant="bordered"
        />
      </div>

      <div className="pt-4">
        <Button
          size="lg"
          type="submit"
          className={`w-full rounded-lg bg-[#EA454C] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#EA454C] focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-[#EA454C] dark:focus:ring-primary-800`}
          isDisabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </form>
  );
}
