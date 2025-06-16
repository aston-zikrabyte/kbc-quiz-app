"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMdPerson } from "react-icons/io";
import { IoMailSharp } from "react-icons/io5";
import { FaPhoneAlt, FaCamera } from "react-icons/fa";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const ProfileEdit = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "",
    mobile: "9989889885",
  });

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setUserData({ ...userData, name });
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setUserData({ ...userData, email });
  };

  const handleMobile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mobile = e.target.value;
    setUserData({ ...userData, mobile });
  };

  const handleUpdateProfile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    alert(`${userData.name} - ${userData.email} - ${userData.mobile}`);
  };

  return (
    <div className="static mb-20 flex h-auto flex-col gap-3 px-5 pt-5 font-bold text-white max-md:pb-14 md:ml-48 md:px-20 lg:px-40 xl:px-60">
      <p className="text-4xl">Edit Profile</p>
      <div className="flex flex-col items-center justify-center gap-6 p-5">
        <div className="relative">
          <Avatar className="h-36 w-36">
            <AvatarImage
              className="object-cover"
              src="/img/avatar_img1.jpg"
              alt="profilepic"
            />
            <AvatarFallback className="text-black">loading...</AvatarFallback>
          </Avatar>
          <div className="absolute right-1 bottom-1 cursor-pointer rounded-full border-1 border-white bg-black p-2 text-white shadow-lg">
            <FaCamera />
          </div>
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
              value={userData.mobile}
              onChange={handleMobile}
              className="w-full focus:border-none focus:outline-none"
              readOnly
            />
          </div>
        </div>
        <Button className="w-full sm:w-100" onClick={handleUpdateProfile}>
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileEdit;
