"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomeNavbar from "./HomeNavbar";
import SideBar from "./SideBar";

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const isHomePage = pathname === "/home";
  const isLoginPage = pathname === "/login";
  const isOtpVerificationPage = pathname === "/otp-verification";
  const isProfilePage = pathname === "/profile";
  const isLeaderboardPage = pathname === "/leaderboard";
  const isWalletPage = pathname === "/wallet";

  return (
    <>
      {isLandingPage && <Navbar />}
      {(isHomePage ||
        isProfilePage ||
        isLeaderboardPage ||
        isWalletPage ||
        isLoginPage ||
        isOtpVerificationPage) && <HomeNavbar />}
      {(isHomePage || isProfilePage || isLeaderboardPage || isWalletPage) && (
        <SideBar />
      )}
      {children}
      {isLandingPage && <Footer />}
    </>
  );
};

export default HomeLayout;
