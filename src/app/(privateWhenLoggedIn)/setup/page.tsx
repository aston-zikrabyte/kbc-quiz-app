"use client";

import Loading from "@/components/custom_components/Loading";
// import Loading from "@/components/custom_components/Loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { IoMailSharp } from "react-icons/io5";
import { toast } from "sonner";

interface userDataI {
  name: string;
  email: string;
  mobile: string;
}

const SetupProfile = () => {
  const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [mobileNumber, setMobileNumber] = useState<string | null>(null);
  const [device_id, setDeviceId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isButtonActive, setIsButtonActive] = useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined" && navigator?.userAgent) {
      setDeviceId(navigator.userAgent);
    }
  }, []);

  const [userData, setUserData] = useState<userDataI>({
    name: "",
    email: "",
    mobile: "",
  });

  React.useEffect(() => {
    const fetchPhoneNumber = async () => {
      const number = localStorage.getItem("phone_number");
      setMobileNumber(number);
      setTimeout(() => setIsLoading(false), 500);
    };
    fetchPhoneNumber();
  }, []);

  // Debounce timer ref
  const debounceTimer = React.useRef<NodeJS.Timeout | null>(null);

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setUserData({ ...userData, name });

    // Clear previous debounce timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Debounce username availability check
    debounceTimer.current = setTimeout(async () => {
      if (name.trim().length === 0) {
        setIsButtonActive(false);
        return;
      }
      const response = await fetch(`${ServerUrl}account/check-existance/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_name: name }),
      });
      const data = await response.json();
      if (!data.success) {
        toast.error("Username already exists!");
        setIsButtonActive(false);
      } else {
        toast.success("Username available!");
        setIsButtonActive(data.success === true);
      }
      setIsButtonActive(false);
    }, 300); // 500ms debounce
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setUserData({ ...userData, email });
  };

  const handleProfileSetup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userData.name) {
      const response = await fetch(`${ServerUrl}account/set-username/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: mobileNumber,
          user_name: userData.name,
          device_id: device_id,
        }),
      });
      const data = await response.json();
      if (!data.error) {
        document.cookie = `access_token=${data.access}; max-age=1000; path=/`;
        document.cookie = `refresh_token=${data.refresh}; max-age=1500; path=/`;
        localStorage.setItem("user_name", data.user_name);
        localStorage.setItem("role", data.role);
        localStorage.setItem("isActive", data.is_active.toString());
        localStorage.setItem("user_id", data.user_id);
        setIsLoading(true);
        setTimeout(() => (window.location.href = "/home"), 1000);
      } else {
        alert(data.error);
      }
    } else {
      alert("Enter User Name");
    }
  };
  return (
    <div className="static mt-10 mb-20 flex h-auto flex-col items-center px-2 pt-5 font-bold text-white">
      <div className="flex flex-col items-center justify-center gap-4 p-5">
        <div className="">
          <Avatar className="h-36 w-36">
            <AvatarImage
              className="object-cover"
              src="/img/login.png"
              alt="profilepic"
            />
            <AvatarFallback>Profile Pic</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-center">
          <p className="text-2xl">Power up your Profile</p>
          <p className="font-thin text-gray-500">
            Complete your profile to start your journey!
          </p>
        </div>
        <div className="w-full sm:w-100">
          <label htmlFor="name">Name</label>
          <div className="flex items-center gap-2 rounded-full border-t-2 border-t-[#202c38] bg-[#0E161F]/80 px-5 py-3">
            <IoMdPerson className="text-gray-500" />
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleUserName}
              placeholder="Enter your name"
              className="w-full focus:border-none focus:outline-none"
            />
          </div>
        </div>
        <div className="w-full sm:w-100">
          <label htmlFor="email">Email (Optional)</label>
          <div className="flex items-center gap-2 rounded-full border-t-2 border-t-[#202c38] bg-[#0E161F]/80 px-5 py-3">
            <IoMailSharp className="text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={userData.email}
              onChange={handleEmail}
              className="w-full focus:border-none focus:outline-none"
            />
          </div>
        </div>
        <div className="w-full sm:w-100">
          <label htmlFor="mobile">Mobile</label>
          <div className="flex w-full items-center gap-2 rounded-full border-t-2 border-t-[#202c38] bg-[#0E161F]/80 px-5 py-3">
            <FaPhoneAlt className="text-gray-500" />
            <input
              type="text"
              name="mobile"
              placeholder="Enter your mobile no."
              className="w-full focus:border-none focus:outline-none"
              value={mobileNumber ?? ""}
              readOnly
            />
          </div>
        </div>
        <Button
          className="w-full sm:w-100"
          onClick={handleProfileSetup}
          disabled={!isButtonActive}
        >
          Setup your Profile
        </Button>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default SetupProfile;
