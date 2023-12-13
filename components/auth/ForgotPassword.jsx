"use client"

import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const router = useRouter();
  
  const forgotPasswordLinkMutation = useMutation({
    mutationFn: (formData) => {
      return axios.post(`http://localhost:3000/api/user/link_resetpassword`, formData);
    },
    onSuccess: () => {
      toast.success("Password reset link sent successfully!");
    },
    onError: (error) => {
      if (error?.response?.data?.message === "User with this email not found!") {
        toast.error("User with this email not found!");
      } else {
        // Network error
        console.error(error);
        toast.error("Network error creating user");
      }
    },
  });

  const onSubmit = (data) => {
    forgotPasswordLinkMutation.mutate(data);
  };


  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white p-6 shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md sm:p-8 md:mt-0">
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Forgot your password?
          </h1>
          <p className="font-light text-gray-500 dark:text-gray-400">
            Don&apos;t fret! Just type in your email and we will send you a link
            to reset your password!
          </p>
          <form
            className="mt-4 space-y-4 md:space-y-5 lg:mt-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <Input
                {...register("email", {
                  required: "Email Address is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                label="Email Address"
                type="email"
                variant="bordered"
              />
              {errors.email && (
                <span className="relative top-2 text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
            <Button
                type="submit"
                size="lg"
                color="primary"
                className={`w-full rounded-lg bg-primary-600 text-center text-sm font-medium text-white hover:bg-primary-700${
                  forgotPasswordLinkMutation.isPending
                    ? "hover: cursor-not-allowed bg-primary-600 hover:bg-primary-600 focus:outline-none disabled:opacity-50 hover:disabled:opacity-50"
                    : ""
                }`}
                isDisabled={forgotPasswordLinkMutation.isPending}
              >
                {forgotPasswordLinkMutation.isPending
                  ? "Sending..."
                  : "Send Link"}
              </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
