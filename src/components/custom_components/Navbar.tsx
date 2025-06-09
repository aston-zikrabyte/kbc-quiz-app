"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between px-6 text-white backdrop-blur-sm min-[3000px]:text-lg md:h-20 md:px-20">
        <div className="text-lg font-bold">Logo</div>

        {/* Desktop Links */}
        <div className="hidden items-center justify-between gap-6 md:flex">
          <Link href={"#home"} className="duration-150 hover:text-purple-500">
            Home
          </Link>
          <Link
            href={"#key-features"}
            className="duration-150 hover:text-purple-500"
          >
            How it works
          </Link>
          <Link
            href={"#testimonials"}
            className="duration-150 hover:text-purple-500"
          >
            Testimonials
          </Link>
          <Link href={"#faqs"} className="duration-150 hover:text-purple-500">
            FAQ
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button size={"lg"}>Play Now</Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="animate-fadeInDropdown fixed top-16 right-0 left-0 z-[999] flex w-full flex-col gap-4 px-6 py-4 text-sm text-white shadow-2xl backdrop-blur-sm transition-all duration-300 ease-in-out md:hidden">
          <Link href={"#home"} className="duration-150 hover:text-purple-500">
            Home
          </Link>
          <Link
            href={"#key-features"}
            className="duration-150 hover:text-purple-500"
          >
            How it works
          </Link>
          <Link
            href={"#testimonials"}
            className="duration-150 hover:text-purple-500"
          >
            Testimonials
          </Link>
          <Link href={"#faqs"} className="duration-150 hover:text-purple-500">
            FAQ
          </Link>
          <Button size={"lg"}>Play Now</Button>
        </div>
      )}
    </>
  );
};

export default Navbar;
