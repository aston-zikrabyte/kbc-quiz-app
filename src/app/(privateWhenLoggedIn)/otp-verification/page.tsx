"use client";

import BackgroundGradient from "@/components/custom_components/BackgroundGradient";
import Loading from "@/components/custom_components/Loading";
import { Button } from "@/components/ui/button";
import { getPhoneNumber } from "@/lib/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useRef, useState, useEffect } from "react";

const OtpVerification = () => {
  const OTP_TIMER_KEY = "otp_timer_end"; // Key for localStorage to store the timer state
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const router = useRouter();
  const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Runs only in the browser
    setDeviceId(navigator.userAgent);
  }, []);

  const [mobileNumber, setMobileNumber] = useState<string | null>(null);

  useEffect(() => {
    const fetchNumber = async () => {
      const number = await getPhoneNumber();
      setMobileNumber(number);
    };
    fetchNumber();
  }, [router]);

  // Timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  //On mount, check localStorage for timer end time
  useEffect(() => {
    const timerEnd = localStorage.getItem(OTP_TIMER_KEY);
    if (timerEnd) {
      const endTime = new Date(timerEnd).getTime();
      const currentTime = new Date().getTime();
      const remainingTime = Math.max(
        0,
        Math.floor((endTime - currentTime) / 1000)
      );
      setTimer(remainingTime);
    }
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      localStorage.removeItem(OTP_TIMER_KEY); // Clear timer when it reaches 0
    } else {
      const timerEnd = new Date(Date.now() + timer * 1000).toISOString();
      localStorage.setItem(OTP_TIMER_KEY, timerEnd); // Store the end time in localStorage
    }
  }, [timer]);

  // Handler for OTP input change
  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value; // Only allow digits

    if (value && idx < inputRefs.current.length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
    setOtp(inputRefs.current.map(input => input?.value).join(""));
  };

  // Handler for backspace to move to previous input
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    const otp = inputRefs.current.map(input => input?.value).join("");
    if (otp.length === 4) {
      const response = await fetch(`${ServerUrl}account/verify-otp/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: mobileNumber,
          device_id: deviceId,
          otp: otp,
        }),
      });
      const data = await response.json();
      if (data.message) {
        router.replace("/setup");
      } else if (data.access) {
        document.cookie = `phone_number=; max-age=; path=/`;
        document.cookie = `access_token=${data.access}; max-age=1000; path=/`;
        document.cookie = `refresh_token=${data.refresh}; max-age=1500; path=/`;
        document.cookie = `user_name=${data.user_name}; max-age=1000; path=/`;
        document.cookie = `role=${data.role}; max-age=1000; path=/`;
        setIsLoading(true);
        setTimeout(() => router.replace("/home"), 1000);
      } else {
        alert(data.error);
      }
    } else {
      alert("Please enter a valid 4-digit OTP.");
    }
  };

  const handleResendOtp = () => {
    // Here you would trigger your resend OTP logic (API call, etc.)
    alert("Resend OTP functionality not implemented yet.");
    setTimer(30); // Reset timer to 30 seconds
    // Optionally, clear OTP fields:
    inputRefs.current.forEach(input => input && (input.value = ""));
    setOtp("");
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="static z-10 flex h-[89vh] flex-col items-center justify-center text-lg text-white">
      <BackgroundGradient />
      <div className="flex h-full w-full max-w-xs flex-col items-center justify-center gap-3 sm:max-w-sm md:max-w-md md:gap-10 lg:max-w-lg">
        <div className="rounded-full border-2 border-gray-800 bg-gray-950 p-3">
          <Image
            src="/gif/login.gif"
            alt="Logo"
            width={60}
            height={60}
            className="size-18 rounded-full border-2 border-gray-700 bg-gradient-to-t from-gray-950 to-gray-700 p-2"
          />
        </div>
        <div>
          <h1 className="mb-1 text-center text-3xl font-bold sm:text-4xl">
            Almost There!
          </h1>
          <p className="mb-4 text-gray-400">
            Please enter OTP sent on {mobileNumber}
          </p>
        </div>
        <form className="flex w-full flex-col items-center gap-4">
          <div className="flex gap-2">
            {[...Array(4)].map((_, idx) => (
              <input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="h-15 w-13 rounded-lg border-2 border-gray-600 bg-gray-900 text-center text-2xl focus:border-[#4CE7ED] focus:outline-none"
                autoComplete="one-time-code"
                name={`otp-${idx}`}
                ref={el => {
                  inputRefs.current[idx] = el;
                }}
                onChange={e => handleOtpChange(e, idx)}
                onKeyDown={e => handleKeyDown(e, idx)}
              />
            ))}
          </div>
          <Button onClick={handleOtpVerification} disabled={otp.length !== 4}>
            Verify OTP
          </Button>
        </form>
      </div>
      <p className="mt-4 text-gray-400">
        Didn&apos;t receive the OTP?{" "}
        <button
          className="cursor-pointer text-white underline disabled:text-gray-500"
          onClick={handleResendOtp}
          disabled={timer > 0}
        >
          {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
        </button>
      </p>
      {isLoading && <Loading />}
    </div>
  );
};

export default OtpVerification;
