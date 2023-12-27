"use client";

import { registerUser } from "@/constants/ApiService";
import { Button, Checkbox, Input } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

export default function SignUpForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await registerUser(data);

      toast.success(
        "You registered successfully! Check your email for a verification link.",
      );
      router.push("/");
    } catch (error) {
      if (error?.response?.status === 400) {
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
    <div className="flex h-screen items-center justify-center bg-white">
      {/* Left: Image */}
      <div className="bg-[#F1F3F6] hidden h-screen w-1/2 md:block">
        <Image
          priority={true}
          width={1000}
          height={1000}
          src="https://i.imgur.com/iUNGvCd.png"
          alt="auth image"
          className="h-screen w-full transform -scale-x-100"
        />
      </div>
      {/* Right: Login Form */}
      <div className="w-full md:w-1/2">
        <div className="mx-auto max-w-[500px] space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Create and account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mt-[50px] flex flex-col gap-[25px]">
              <div>
                <Input
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 50,
                      message: "Name must be at most 50 characters long",
                    },
                  })}
                  label="Your full name"
                  type="text"
                  placeholder="your full name"
                  labelPlacement="outside"
                  variant="bordered"
                  size="lg"
                />
                {errors.name && (
                  <span className="relative top-2 text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>
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
                  placeholder="you@example.com"
                  labelPlacement="outside"
                  size="lg"
                />
                {errors.email && (
                  <span className="relative top-2 text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  label="Password"
                  type={isVisible ? "text" : "password"}
                  variant="bordered"
                  placeholder="Password"
                  labelPlacement="outside"
                  size="lg"
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
            </div>

            {/* <div>
                <Checkbox size="md">
                  I accept the
                  <Link
                    className="ml-2 font-medium text-[#EA454C] hover:underline dark:text-primary-500"
                    href=""
                  >
                    Terms and Conditions
                  </Link>
                </Checkbox>
              </div> */}

            <Button
              type="submit"
              size="lg"
              color="primary"
              className={`w-full rounded-lg bg-[#EA454C] text-center text-sm font-medium text-white hover:bg-[#EA454C]${
                isLoading
                  ? "hover: cursor-not-allowed bg-[#EA454C] hover:bg-[#EA454C] focus:outline-none disabled:opacity-50 hover:disabled:opacity-50"
                  : ""
              }`}
              isDisabled={isLoading}
            >
              {isLoading ? "Loading..." : "Create an account"}
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?&nbsp;
              <Link
                href="/"
                className="font-medium text-[#EA454C] hover:underline dark:text-primary-500"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
