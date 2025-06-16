"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BiHomeAlt2 } from "react-icons/bi";
import { GoTrophy } from "react-icons/go";
import { PiWallet } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";

const SideBar = () => {
  const pathname = usePathname();
  const isHomeButtonActive = pathname === "/home";
  const isRewardsButtonActive = pathname === "/leaderboard";
  const isWalletButtonActive = pathname.startsWith("/wallet");
  const isProfileButtonActive = pathname.startsWith("/profile");
  const activeButtonStyle = {
    style:
      "border-t-2 border-t-[#4BE0F1] bg-gradient-to-t from-[#0E161F] to-[#2e9ba8] md:border-t-0 md:border-l-4 md:border-l-[#4BE0F1]",
    iconColor: "primary",
    iconStyle: "size-7 text-[#53DBDB]",
  };
  const inactiveButtonStyle = {
    style: "",
    iconColor: "secondary",
    iconStyle: "size-7",
  };

  const isButtonActive = (result: boolean) => {
    return result ? activeButtonStyle : inactiveButtonStyle;
  };

  const links = [
    {
      href: "/home",
      label: "Home",
      icon: "home",
      active: isHomeButtonActive,
    },
    {
      href: "/leaderboard",
      label: "Leaderboard",
      icon: "trophy",
      active: isRewardsButtonActive,
    },
    {
      href: "/wallet",
      label: "Wallet",
      icon: "wallet",
      active: isWalletButtonActive,
    },
    {
      href: "/profile",
      label: "Profile",
      icon: "user",
      active: isProfileButtonActive,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-20 w-full items-center justify-between rounded-t-lg border-t-1 border-t-[#FFFFFF1F] bg-[#0E161F]/80 px-6 py-1 pb-3 text-white backdrop-blur-sm sm:px-20 md:top-20 md:bottom-0 md:left-0 md:h-[calc(100vh-5rem)] md:w-48 md:flex-col md:justify-start md:gap-2 md:rounded-t-none md:rounded-r-lg md:border-t-0 md:border-r-1 md:border-r-[#FFFFFF1F] md:px-0 md:py-8">
      {links.map(link => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex h-full w-16 items-center justify-center rounded-t-lg transition-colors duration-150 ${isButtonActive(link.active).style} md:h-16 md:w-full md:justify-start md:rounded-t-none md:rounded-r-lg md:px-6`}
        >
          {link.icon === "home" && (
            <BiHomeAlt2
              className={`${isButtonActive(link.active).iconStyle} md:mr-3`}
            />
          )}
          {link.icon === "trophy" && (
            <GoTrophy
              className={`${isButtonActive(link.active).iconStyle} md:mr-3`}
            />
          )}
          {link.icon === "wallet" && (
            <PiWallet
              className={`${isButtonActive(link.active).iconStyle} md:mr-3`}
            />
          )}
          {link.icon === "user" && (
            <BsPerson
              className={`${isButtonActive(link.active).iconStyle} md:mr-3`}
            />
          )}
          <span className="hidden text-base font-medium md:inline">
            {link.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default SideBar;
