"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSession } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const ProfilePage = () => {
  const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleLogout = async () => {
    const sessionData = await getSession();
    const access_token = sessionData?.access_token;
    const refresh_token = sessionData?.refresh_token;
    const response = await fetch(`${ServerUrl}account/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({ refresh: refresh_token }),
    });
    const data = await response.json();
    if (!data.error) {
      document.cookie = `phone_number=; max-age=; path=/`;
      document.cookie = `access_token=; max-age=; path=/`;
      document.cookie = `refresh_token=; max-age=; path=/`;
      document.cookie = `user_name=; max-age=; path=/`;
      document.cookie = `role=; max-age=; path=/`;
      redirect("/login");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="static mb-20 flex h-auto flex-col gap-3 px-5 pt-5 font-bold text-white max-md:pb-14 md:ml-48 md:px-20 lg:px-40 xl:px-60">
      <div className="flex flex-col items-center justify-center gap-3 p-5">
        <div>
          <Avatar className="h-36 w-36">
            <AvatarImage
              className="object-cover"
              src="/img/avatar_img1.jpg"
              alt="profilepic"
            />
            <AvatarFallback className="text-black">loading...</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-center">
          <p className="text-2xl">John Doe</p>
          <p className="text-gray-400">9898098098</p>
        </div>
        <div
          className="cursor-pointer rounded-full border-t-2 border-t-[#51D7D7] bg-[#51D7D7]/10 px-3 py-2 text-[#51D7D7]"
          onClick={() => setShowProfileModal(true)}
        >
          View Profile
        </div>
      </div>
      <div className="grid grid-flow-row lg:grid-cols-2">
        <div className="p-2">
          <p className="mb-2 ml-2">Profile & Account</p>
          <Link
            href={"/profile/edit"}
            className="flex items-center gap-3 rounded-2xl border-t-2 border-t-[#202c38] bg-[#0E161F]/80 p-5"
          >
            <Image
              src="/icons/profile-icon.png"
              alt="profile"
              height={30}
              width={30}
            />
            <p>Manage Profile</p>
          </Link>
        </div>
        <div className="p-2">
          <p className="mb-2 ml-2">Notifications & Alerts</p>
          <div className="flex items-center gap-3 rounded-2xl border-t-2 border-t-[#202c38] bg-[#0E161F]/80 p-5">
            <Image
              src="/icons/notification-bell.png"
              alt="profile"
              height={30}
              width={30}
            />
            <p>Notification</p>
          </div>
        </div>
        <div className="p-2">
          <p className="mb-2 ml-2">Apps Preferences</p>
          <div className="flex items-center gap-3 rounded-2xl border-t-2 border-t-[#202c38] bg-[#0E161F]/80 p-5">
            <Image
              src="/icons/how-to-play.png"
              alt="profile"
              height={30}
              width={30}
            />
            <p>How to Play</p>
          </div>
        </div>
        <div className="p-2 md:row-span-3">
          <p className="mb-2 ml-2">Support & Help</p>
          <div className="flex flex-col rounded-2xl border-t-2 border-t-[#202c38] bg-[#0E161F]/80 p-5">
            <div className="flex items-center gap-3 p-2">
              <Image
                src="/icons/contact-support.png"
                alt="profile"
                height={30}
                width={30}
              />
              <p>Contact Support</p>
            </div>
            <div className="flex items-center gap-3 border-t-1 border-t-gray-700 p-2">
              <Image
                src="/icons/terms-conditions.png"
                alt="profile"
                height={30}
                width={30}
              />
              <p>Terms & Conditions</p>
            </div>
            <div className="flex items-center gap-3 border-t-1 border-t-gray-700 p-2">
              <Image
                src="/icons/privacy-policy.png"
                alt="profile"
                height={30}
                width={30}
              />
              <p>Privacy Policy</p>
            </div>
          </div>
        </div>
        <div className="p-2">
          <p className="mb-2 ml-2">Log Out</p>
          <div className="flex flex-col rounded-2xl border-t-2 border-t-[#202c38] bg-[#0E161F]/80 p-5">
            <div
              className="flex cursor-pointer items-center gap-3 p-2"
              onClick={handleLogout}
            >
              <Image
                src="/icons/logout.png"
                alt="profile"
                height={30}
                width={30}
              />
              <p>Logout</p>
            </div>
            <div className="flex items-center gap-3 border-t-1 border-t-gray-700 p-2">
              <Image
                src="/icons/delete-account.png"
                alt="profile"
                height={30}
                width={30}
              />
              <p>Delete Account</p>
            </div>
          </div>
        </div>
      </div>
      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="relative m-10 flex w-full max-w-md flex-col items-center rounded-2xl bg-[#181C23] p-8 shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setShowProfileModal(false)}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Avatar className="mb-4 h-24 w-24">
              <AvatarImage
                className="object-cover"
                src="/img/avatar_img1.jpg"
                alt="profilepic"
              />
              <AvatarFallback>Profile Pic</AvatarFallback>
            </Avatar>
            <p className="mb-1 text-3xl underline">John Doe</p>
            <div className="w-full">
              <div className="mb-4">
                <p className="mb-2 text-center text-lg text-gray-300">
                  Career Stats
                </p>
                <div className="flex justify-between">
                  <p className="text-sm">SKILL SCORE </p>
                  <p className="text-sm text-[#51D7D7]">42 %</p>
                </div>
                <div className="mb-2 h-3 w-full rounded-full bg-gray-700">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-[#51D7D7] to-[#8D45B5] transition-all"
                    style={{
                      width: `${Math.min(42, 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <p>Game Mode</p>
                  <div className="flex gap-2">
                    <div className="w-1/2 rounded-lg border-t-2 border-t-[#202c38] bg-[#0E161F] p-3">
                      <p>0</p>
                      <p className="text-sm text-gray-400">Single Player</p>
                    </div>
                    <div className="w-1/2 rounded-lg border-t-2 border-t-[#202c38] bg-[#0E161F] p-3">
                      <p>0</p>
                      <p className="text-sm text-gray-400">Multi Player</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p>Practice Mode</p>
                  <div className="flex gap-2">
                    <div className="w-1/2 rounded-lg border-t-2 border-t-[#202c38] bg-[#0E161F] p-3">
                      <p>0</p>
                      <p className="text-sm text-gray-400">Single Player</p>
                    </div>
                    <div className="w-1/2 rounded-lg border-t-2 border-t-[#202c38] bg-[#0E161F] p-3">
                      <p>0</p>
                      <p className="text-sm text-gray-400">Multi Player</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
