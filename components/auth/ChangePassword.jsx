"use client";

import { changePasswordById } from "@/constants/ApiService";
import { Button, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ChangePassword() {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const newPassword = watch("newPassword", "");
  const validateConfirmPassword = (value) => {
    return value === newPassword || "Passwords do not match";
  };

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await changePasswordById(user._id, data, accessToken);

      toast.success("Password updated successfully");
      setIsLoading(false);
    } catch (error) {
      // Handle any other errors that may occur during the API request
      if (error?.response?.status) {
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
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
    <div className="grid h-screen min-h-screen w-full overflow-hidden">
      <div className="flex flex-col border">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <h5 className="border-b pb-2 text-lg font-semibold">
            Change password
          </h5>
          <form
            className="max-w-[400px] space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-[30px]">
              <Input
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
                label="Current Password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                endContent={
                  <button
                    className="relative top-[-5px] focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FaEye className="pointer-events-none text-2xl text-default-400" />
                    ) : (
                      <FaEyeSlash className="pointer-events-none text-2xl text-default-400" />
                    )}
                  </button>
                }
              />
              {errors.currentPassword && (
                <span className="relative top-2 text-red-500">
                  {errors.currentPassword.message}
                </span>
              )}
            </div>
            <hr />
            <div>
              <Input
                {...register("newPassword", {
                  required: "New password is required",
                })}
                label="New Password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                endContent={
                  <button
                    className="relative top-[-5px] focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FaEye className="pointer-events-none text-2xl text-default-400" />
                    ) : (
                      <FaEyeSlash className="pointer-events-none text-2xl text-default-400" />
                    )}
                  </button>
                }
              />
              {errors.newPassword && (
                <span className="relative top-2 text-red-500">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
            <div>
              <Input
                {...register("confirmNewPassword", {
                  validate: validateConfirmPassword,
                })}
                label="Confirm New Password"
                type={isVisible ? "text" : "password"}
                variant="bordered"
                endContent={
                  <button
                    className="relative top-[-5px] focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <FaEye className="pointer-events-none text-2xl text-default-400" />
                    ) : (
                      <FaEyeSlash className="pointer-events-none text-2xl text-default-400" />
                    )}
                  </button>
                }
              />
              {errors.confirmNewPassword && (
                <span className="relative top-2 text-red-500">
                  {errors.confirmNewPassword.message}
                </span>
              )}
            </div>
            <Button
              size="lg"
              type="submit"
              className={`w-full rounded-lg bg-[#EA454C] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#EA454C] focus:outline-none focus:ring-4 focus:ring-primary-300`}
              isDisabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
}
