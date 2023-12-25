"use client";

import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
  // const [resetToken, setResetToken] = useState('');
  const [error, setError] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const resetToken = searchParams.get("token");

  const password = watch("password");

  const resetUserPasswordMutation = useMutation({
    mutationFn: ({ password }) => {
      return axios.post(`http://localhost:3000/api/user/reset_password`, {
        token: resetToken,
        password,
      });
    },
    onSuccess: () => {
      toast.success("Password reset successfully!");
    },
    onError: (error) => {
      if (error.response && error.response.status === 400) {
        // Invalid or expired token
        toast.error("Invalid or expired reset token.");
        setError(true);
      } else {
        // Show a generic error message for other errors
        toast.error("An error occurred during password reset.");

        // Log the detailed error for debugging
        console.error(error);
      }
    },
  });

  const onSubmit = (data) => {
    resetUserPasswordMutation.mutate(data);
  };

  return (
    <>
      {error ? (
        <div className="mx-auto mt-20 flex h-[302px] max-w-[608px] flex-col items-center justify-center gap-2 border bg-white p-4 shadow">
          <svg
            height="70"
            viewBox="0 0 32 32"
            width="70"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m30 24a6 6 0 1 0 -6 6 6.0066 6.0066 0 0 0 6-6zm-2 0a3.9521 3.9521 0 0 1 -.5669 2.019l-5.4521-5.4521a3.9529 3.9529 0 0 1 2.019-.5669 4.0045 4.0045 0 0 1 4 4zm-8 0a3.9521 3.9521 0 0 1 .5669-2.019l5.4521 5.4521a3.9529 3.9529 0 0 1 -2.019.5669 4.0045 4.0045 0 0 1 -4-4z" />
            <path d="m14 2a12 12 0 1 0 2 23.82v-1.82a8 8 0 0 1 8-8h1.82a11.9348 11.9348 0 0 0 -11.82-14zm-2 16.5908-4-4 1.5908-1.5908 2.4092 2.4092 5.4092-5.4092 1.5908 1.5908z" />
            <g fill="none">
              <path d="m12 18.591-4-4 1.591-1.591 2.409 2.409 5.409-5.409 1.591 1.591z" />
              <path d="m0 0h32v32h-32z" />
            </g>
          </svg>
          <h5 className="text-center text-xl font-semibold">
            Sorry! You seem to have an invalid or expired invite code.
          </h5>
          <Link
            href="/forgot-password"
            className="mt-3 rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700"
          >
            Try again!
          </Link>
        </div>
      ) : (
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
                  className={`w-full rounded-lg bg-primary-600 text-center text-sm font-medium text-white hover:bg-primary-700${
                    resetUserPasswordMutation.isPending
                      ? "hover: cursor-not-allowed bg-primary-600 hover:bg-primary-600 focus:outline-none disabled:opacity-50 hover:disabled:opacity-50"
                      : ""
                  }`}
                  isDisabled={resetUserPasswordMutation.isPending}
                >
                  {resetUserPasswordMutation.isPending
                    ? "Reseting..."
                    : "Reset Password"}
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
      )}
    </>
  );
}
