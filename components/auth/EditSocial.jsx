"use client";

import { Button, Input } from "@nextui-org/react";
import axios from "axios";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/redux/actions";
import { toast } from "react-toastify";

export default function EditSocial({ handleDrawerClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/updateUserById/${user._id}`,
        { social: data },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      dispatch(updateUser(response.data.user));

      toast.success("profile updated successfully");
      setIsLoading(false);
      handleDrawerClose();
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An unexpected error occurred");
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
          className={`w-full rounded-lg bg-[#111827] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
          isDisabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </div>
    </form>
  );
}
