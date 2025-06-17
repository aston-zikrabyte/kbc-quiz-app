"use client";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import Loading from "@/components/custom_components/Loading";

const Login = () => {
  const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [mobileNumber, setMobileNumber] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isAgeChecked, setIsAgeChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 200);
  });

  // Function to handle mobile number input change
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (value.length >= 10 && isAgeChecked) {
      setIsDisabled(false); // Enable the button if mobile number is valid and age is checked
    } else {
      setIsDisabled(true);
    }
    setMobileNumber(value);
  };

  const handleAgeCheck = (checked: boolean) => {
    setIsAgeChecked(checked);
    // Enable the submit button only if the age is checked and mobile number is valid
    if (checked && mobileNumber.length >= 10) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsLoading(true);
    // Handle login or registration logic here
    try {
      const response = await fetch(`${ServerUrl}account/login-or-signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: `+91${mobileNumber}` }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data) {
          localStorage.setItem("phone_number", `+91${mobileNumber}`);
          setTimeout(() => router.push("/otp-verification"), 100);
          return;
        }
      } else {
        setIsLoading(false);
        toast.error("Server Error");
      }
    } catch (err) {
      toast.error(`Server error - ${err}`);
    }
  };

  return (
    <div className="static z-10 flex h-[90vh] flex-col items-center justify-center text-lg text-white">
      <div className="flex h-full w-full max-w-xs flex-col items-center justify-center gap-5 sm:max-w-sm md:max-w-md md:gap-10 lg:max-w-lg">
        <div className="rounded-full border-2 border-gray-800 bg-gray-950 p-3">
          <Image
            src="/gif/login.gif"
            alt="Logo"
            width={60}
            height={60}
            className="size-18 rounded-full border-2 border-gray-700 bg-gradient-to-t from-gray-950 to-gray-700 p-2"
          />
        </div>
        <div className="text-center">
          <h1 className="mb-1 text-3xl font-bold sm:text-4xl">
            Login / Register
          </h1>
          <p className="mb-6">Please enter your mobile number</p>
        </div>
        <form className="flex w-full flex-col gap-4">
          <div className="flex w-full">
            <div className="flex h-16 max-w-[80px] min-w-[60px] items-center justify-center rounded-l-full border-0 border-t-2 border-b-4 border-t-slate-700 border-b-black bg-[#0E161F]/80 py-2 text-white focus:ring-0 focus:outline-none sm:text-base">
              +91
            </div>
            <input
              type="tel"
              placeholder="Mobile Number"
              className="w-full rounded-r-full border-t-2 border-b-4 border-t-slate-700 border-b-black bg-[#0E161F]/80 px-3 py-2 text-white focus:ring-0 focus:outline-none sm:text-base"
              pattern="[0-9]{10,15}"
              value={mobileNumber}
              onChange={handleMobileChange}
              maxLength={10}
              required
            />
          </div>
          <div className="flex items-center gap-2 text-white">
            <Checkbox
              className="text-white"
              id="age-check"
              checked={isAgeChecked}
              onCheckedChange={handleAgeCheck}
            />
            <label htmlFor="age-check">
              I certify that I am above 18 years
            </label>
          </div>
          <Button
            type="button"
            onClick={handleSubmit}
            className="rounded-full p-2 transition-colors sm:text-lg"
            disabled={isDisabled} // Change to true to disable the button
          >
            Login
          </Button>
        </form>
      </div>
      <p>
        By continuing, you agree to our{" "}
        <Link className="underline" href="/terms">
          T&C
        </Link>
        .
      </p>
      {isLoading && <Loading />}
    </div>
  );
};

export default Login;
