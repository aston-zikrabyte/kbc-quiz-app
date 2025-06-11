"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isAgeChecked, setIsAgeChecked] = useState(false);

  const router = useRouter();

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

  // Function to handle country code selection change
  const handleCountryChange = (value: string) => {
    setCountryCode(value);
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
  // This function will log the mobile number and country code
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login or registration logic here
    alert(`Mobile Number: ${countryCode}-${mobileNumber}`);
    if (mobileNumber) {
      router.push("/otp-verification");
      return;
    }
  };

  return (
    <div className="static z-10 flex h-[90vh] flex-col items-center justify-center text-lg text-white">
      <div className="flex h-full w-full max-w-xs flex-col items-center justify-center gap-5 sm:max-w-sm md:max-w-md md:gap-10 lg:max-w-lg">
        <div>
          <Image
            src="/logo.png"
            alt="Logo"
            width={96}
            height={96}
            className="size-24 rounded-full border-2 border-white"
          />
        </div>
        <div>
          <h1 className="mb-1 text-center text-3xl font-bold sm:text-4xl">
            Login / Register
          </h1>
          <p className="mb-6">Please enter your mobile number</p>
        </div>
        <form className="flex w-full flex-col gap-4">
          <div className="flex w-full">
            <Select onValueChange={handleCountryChange} defaultValue="+91">
              <SelectTrigger className="shadow-b-md max-w-[100px] min-w-[70px] rounded-l-full border-0 border-t-2 border-b-4 border-t-slate-700 border-b-black bg-slate-950 py-7 text-sm text-white focus:ring-0 focus:outline-none sm:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-950 text-white">
                <SelectItem value="+91">+91</SelectItem>
                <SelectItem value="+1">+1</SelectItem>
                <SelectItem value="+44">+44</SelectItem>
                <SelectItem value="+61">+61</SelectItem>
                <SelectItem value="+971">+971</SelectItem>
              </SelectContent>
              {/* Add more country codes as needed */}
            </Select>
            <input
              type="tel"
              placeholder="Mobile Number"
              className="w-full rounded-r-full border-t-2 border-b-4 border-t-slate-700 border-b-black bg-slate-950 px-3 py-2 text-sm text-white focus:ring-0 focus:outline-none sm:text-base"
              pattern="[0-9]{10,15}"
              value={mobileNumber}
              onChange={handleMobileChange}
              maxLength={10} // Adjust based on the maximum length of the mobile number
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
    </div>
  );
};

export default Login;
