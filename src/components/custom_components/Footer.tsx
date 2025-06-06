import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="border-t-background/5 flex flex-col gap-10 border-t-1 bg-[#0D1115] px-4 pt-10 text-gray-400 sm:px-8 md:px-16 md:pt-16">
      <div className="mb-5 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 md:gap-10 lg:grid-cols-5">
        <div className="flex flex-col gap-3 sm:col-span-2">
          <p className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            KBC Quiz
          </p>
          <p className="text-sm sm:text-base">
            The smartest way to test your knowledge and earn rewards.{" "}
            <br className="hidden sm:block" />
            Challenge friends, learn new facts, and win real prizes!
          </p>
          <div className="mt-4 flex gap-4 sm:gap-5">
            <div className="bg-background/5 hover:bg-background/10 rounded-full p-2 duration-200">
              <a href="#" target="_blank">
                <Image
                  src={`/icons/instagram.png`}
                  alt=""
                  width={18}
                  height={18}
                />
              </a>
            </div>
            <div className="bg-background/5 hover:bg-background/10 rounded-full p-2 duration-200">
              <a href="#" target="_blank">
                <Image
                  src={`/icons/twitter.png`}
                  alt=""
                  width={18}
                  height={18}
                />
              </a>
            </div>
            <div className="bg-background/5 hover:bg-background/10 rounded-full p-2 duration-200">
              <a href="#" target="_blank">
                <Image
                  src={`/icons/facebook.png`}
                  alt=""
                  width={18}
                  height={18}
                />
              </a>
            </div>
            <div className="bg-background/5 hover:bg-background/10 rounded-full p-2 duration-200">
              <a href="#" target="_blank">
                <Image
                  src={`/icons/youtube.png`}
                  alt=""
                  width={18}
                  height={18}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-bold text-white sm:text-lg">
            Quick Links
          </p>
          <Link
            href={"#"}
            className="text-sm duration-200 hover:text-gray-500 sm:text-base"
          >
            Home
          </Link>
          <Link
            href={"#"}
            className="text-sm duration-200 hover:text-gray-500 sm:text-base"
          >
            Features
          </Link>
          <Link
            href={"#"}
            className="text-sm duration-200 hover:text-gray-500 sm:text-base"
          >
            How it Works
          </Link>
          <Link
            href={"#"}
            className="text-sm duration-200 hover:text-gray-500 sm:text-base"
          >
            Testimonials
          </Link>
          <Link
            href={"#"}
            className="text-sm duration-200 hover:text-gray-500 sm:text-base"
          >
            FAQs
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base font-bold text-white sm:text-lg">Legal</p>
          <Link
            href={"#"}
            className="text-sm duration-200 hover:text-gray-500 sm:text-base"
          >
            Terms of Service
          </Link>
          <Link
            href={"#"}
            className="text-sm duration-200 hover:text-gray-500 sm:text-base"
          >
            Privacy Policy
          </Link>
          <Link
            href={"#"}
            className="text-sm duration-200 hover:text-gray-500 sm:text-base"
          >
            Refund Policy
          </Link>
          <Link
            href={"#"}
            className="text-sm duration-200 hover:text-gray-500 sm:text-base"
          >
            Fairplay Policy
          </Link>
          <Link
            href={"#"}
            className="text-sm duration-200 hover:text-gray-500 sm:text-base"
          >
            Responsible Gaming
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-base font-bold text-white sm:text-lg">Contact</p>
          <p className="text-sm sm:text-base">Need Help or Have Feedback?</p>
          <div>
            <Button size={"lg"} className="w-full sm:w-auto">
              Contact Support
            </Button>
          </div>
          <a href="#" className="text-sm hover:text-gray-500 sm:text-base">
            support@kbcquizapp.com
          </a>
        </div>
      </div>
      <div className="border-t-background/5 mx-0 flex h-auto flex-col items-center justify-between gap-2 border-t-1 p-3 text-xs sm:text-sm md:mx-10 md:h-20 md:flex-row md:gap-0">
        <p className="mb-2 md:mb-0">
          &copy; 2025 KBC Quiz. All rights reserved.
        </p>
        <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-0">
          <div className="flex items-center gap-2 border-b border-gray-700 pb-1 sm:border-r sm:border-b-0 sm:pr-5 sm:pb-0">
            <Image
              src="/icons/green-dot.png"
              alt="Online"
              width={10}
              height={10}
            />
            <span>Online Support</span>
          </div>
          <span className="pt-1 sm:pt-0 sm:pl-5">Made in India</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
