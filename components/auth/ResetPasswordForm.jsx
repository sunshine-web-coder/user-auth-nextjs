"use client";

import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ResetPasswordForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const router = useRouter();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/reset_password",
        { token: data.token, password: data.password }
      );

      if (response.status === 200) {
        toast.success("Password reset successfully!");
        // Redirect to login or show a login link
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid or expired token");
      } else {
        toast.error("Network error resetting password");
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md sm:p-8 md:mt-0">
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Reset Password
          </h1>

          <form
            className="mt-4 space-y-4 md:space-y-5 lg:mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Input
                {...register("password", {
                  required: "Password is required",
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
              {errors.password && (
                <span className="relative top-2 text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div>
              <Input
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match", // New: Validate that confirm password matches password
                })}
                label="Confirm Password"
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
              {errors.confirmPassword && (
                <span className="relative top-2 text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              color="primary"
              // className={`w-full rounded-lg bg-primary-600 text-center text-sm font-medium text-white hover:bg-primary-700${
              //   resetPasswordMutation.isPending
              //     ? "hover: cursor-not-allowed bg-primary-600 hover:bg-primary-600 focus:outline-none disabled:opacity-50 hover:disabled:opacity-50"
              //     : ""
              // }`}
              // isDisabled={resetPasswordMutation.isPending}
            >
              {/* {resetPasswordMutation.isPending
                ? "Reseting..."
                : "Reset Password"} */}
                Reset Password
            </Button>
            <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
              Remember your password? &nbsp;
              <Link
                href="/"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
