"use client";

import { Button, Checkbox, Input } from "@nextui-org/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginSuccess, setUser } from "@/redux/actions";
import { toast } from "react-toastify";
import Image from "next/image";
import { loginUser } from "@/constants/ApiService";
import Cookies from "js-cookie";

export default function SignUpForm() {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Make an API request to your login endpoint
      const response = await loginUser(data);

      const { accessToken, refreshToken, user } = response;

      Cookies.set('accessToken', accessToken, { secure: true, sameSite: 'strict' });
      Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'strict' });

      // Dispatch actions on successful login
      dispatch(setUser(user));

      toast.success("You logged in successfully!");
      router.push("/dashboard/user");
    } catch (error) {
      // Handle any other errors that may occur during the API request
      if (error?.response?.status === 401) {
        if (error?.response?.data?.message === "Email not verified") {
          toast.error(
            "Email not verified, please check your mail for the verification link sent to you.",
          );
        } else {
          // Handle other 401 errors
          toast.error("Invalid credentials");
        }
      } else {
        console.error("Error during login:", error);
        toast.error("An unexpected error occurred", { position: "top-right" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      {/* Left: Image */}
      <div className="hidden h-screen w-1/2 bg-[#F1F3F6] md:block">
        <Image
          priority={true}
          width={1000}
          height={1000}
          src="https://i.imgur.com/iUNGvCd.png"
          alt="auth image"
          className="h-screen w-full -scale-x-100 transform"
        />
      </div>
      {/* Right: Login Form */}
      <div className="w-full md:w-1/2">
        <div className="mx-auto max-w-[500px] space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            Log in to your account
          </h1>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mt-[50px] flex flex-col gap-[25px]">
              <div>
                <Input
                  {...register("email", {
                    required: "Email Address is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  size="lg"
                  type="email"
                  label="Email Address"
                  placeholder="you@example.com"
                  labelPlacement="outside"
                  variant="bordered"
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
            <div className="flex items-center justify-between">
              <div>
                <Checkbox size="md" defaultSelected>
                  Remember me
                </Checkbox>
              </div>
              <Link
                href="/forgot-password"
                className="text-[#EA454C] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              size="lg"
              type="submit"
              className={`w-full rounded-lg bg-[#EA454C] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#EA454C] focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-[#EA454C] dark:hover:bg-[#EA454C] dark:focus:ring-primary-800`}
              isDisabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                href="signup"
                className="font-medium text-[#EA454C] hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
