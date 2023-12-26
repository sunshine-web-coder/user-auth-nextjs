"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { verifyEmail } from "@/constants/ApiService";

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await verifyEmail(token);
      setVerificationSuccess(true);
      toast.success("Email verified successfully!");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid token or Email is already verified.");
        setError(true);
      } else {
        toast.error("Network error verifying user");
      }
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      {verificationSuccess && (
        <div className="mx-auto mt-20 flex h-[302px] max-w-[528px] flex-col items-center justify-center gap-2 border bg-white p-4 shadow">
          <svg
            viewBox="0 0 512 512"
            fill="#45B618"
            className="h-12 w-20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m256 8c-136.967 0-248 111.033-248 248s111.033 248 248 248 248-111.033 248-248-111.033-248-248-248zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068l-141.352 140.216-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z" />
          </svg>
          <h5 className="text-4xl font-bold">Success</h5>
          <p>Your account has been successfully verified</p>
          <Link
            href="/"
            className="mt-3 rounded-lg bg-[#EA454C] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#EA454C]"
          >
            Process to Login
          </Link>
        </div>
      )}

      {error && (
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
            href="/"
            className="mt-3 rounded-lg bg-[#EA454C] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#EA454C]"
          >
            Process to Login
          </Link>
        </div>
      )}
    </div>
  );
}
