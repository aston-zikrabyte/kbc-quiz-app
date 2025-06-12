import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfilePage = () => {
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
            <AvatarFallback>Profile Pic</AvatarFallback>
          </Avatar>
        </div>
        <p className="text-2xl">John Doe</p>
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
            <div className="flex items-center gap-3 p-2">
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
    </div>
  );
};

export default ProfilePage;
