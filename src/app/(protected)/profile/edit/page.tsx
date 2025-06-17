"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMdPerson } from "react-icons/io";
import { IoMailSharp } from "react-icons/io5";
import { FaPhoneAlt, FaCamera } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Loading from "@/components/custom_components/Loading";
import { toast } from "sonner";
import { getSession } from "@/app/_lib/auth";
import { useRouter } from "next/navigation";
import ImageCropModal from "@/components/custom_components/ProfileEditModal";

// --- Modal for image upload and crop ---

const ProfileEdit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState("");
  const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    profileUrl: "",
  });
  const [showCropModal, setShowCropModal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("/img/avatar_img1.jpg");

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      const access_token = session?.access_token ?? "";
      setAccessToken(access_token);
    }
    fetchSession();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!accessToken) return; // Wait until accessToken is set
      const response = await fetch(`${ServerUrl}account/manage-profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setIsLoading(false);
      setUserData({
        name: data.user.user_name,
        email: data.user.email || "",
        mobile: data.user.phone_number,
        profileUrl: data.user.profile_picture,
      });
    }
    fetchData();
  }, [accessToken]);

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

  const handleUpdateProfile = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    try {
      // Prepare form data for image and profile fields
      const formData = new FormData();

      // Only send user_name if changed
      if (userData.name && userData.name !== "") {
        formData.append("user_name", userData.name);
      }

      // Only send profile_pic if avatarUrl is a blob (cropped/new image)
      if (avatarUrl && avatarUrl.startsWith("blob:")) {
        const blob = await fetch(avatarUrl).then(r => r.blob());
        formData.append("profile_picture", blob, "profile.jpg");
      }

      // Only send email if it is being added (not updated)
      if (userData.email && userData.email !== "") {
        formData.append("email", userData.email);
      }

      const response = await fetch(`${ServerUrl}account/manage-profile/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        if (!data.error) {
          toast.success(data.message);
          localStorage.setItem("user_name", userData.name);
          localStorage.setItem("email", userData.email);
          if (data.message !== "No changes made") router.replace("/profile");
        }
      } else {
        toast.error("Not updated!");
      }
    } catch (error) {
      toast.error(`Server error - ${error}`);
    }
  };

  // Handle avatar update after cropping
  const handleAvatarCrop = (croppedUrl: string) => {
    setAvatarUrl(croppedUrl);
    // Here you can also upload the cropped image to your server if needed
    setUserData(prev => ({ ...prev, profileUrl: croppedUrl }));
  };

  return (
    <div className="static mb-20 flex h-auto flex-col gap-3 px-5 pt-5 font-bold text-white max-md:pb-14 md:ml-48 md:px-20 lg:px-40 xl:px-60">
      <p className="text-4xl">Edit Profile</p>
      <div className="flex flex-col items-center justify-center gap-6 p-5">
        <div className="relative">
          <Avatar className="h-36 w-36">
            <AvatarImage
              className="object-cover"
              src={`${userData.profileUrl}`}
              alt="profilepic"
            />
            <AvatarFallback className="text-black">loading...</AvatarFallback>
          </Avatar>
          <div
            className="absolute right-1 bottom-1 cursor-pointer rounded-full border-1 border-white bg-black p-2 text-white shadow-lg"
            onClick={() => setShowCropModal(true)}
          >
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
      {isLoading && <Loading />}
      <ImageCropModal
        open={showCropModal}
        onClose={() => setShowCropModal(false)}
        onCrop={handleAvatarCrop}
      />
    </div>
  );
};

export default ProfileEdit;
