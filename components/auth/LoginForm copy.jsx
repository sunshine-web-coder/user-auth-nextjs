"use client";

import { Button, Checkbox, Input } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { loginSuccess, setUser } from "@/redux/actions";
import { toast } from "react-toastify";
import Image from "next/image";
import { loginUser } from "@/constants/ApiService";

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
      const response = await loginUser(data)

      const { accessToken, refreshToken, user } = response;

      // Dispatch actions on successful login
      dispatch(loginSuccess(accessToken, refreshToken));
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
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
              Log in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
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

              <div>
                <Input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  label="Password"
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
              <div className="flex items-center justify-between">
                <div>
                  <Checkbox size="md" defaultSelected>
                    Remember me
                  </Checkbox>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-[#005AC2] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Button
                size="lg"
                type="submit"
                className={`w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                isDisabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="signup"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
