import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HomeNavbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/home";
  return (
    <div className="border-b-background/20 sticky top-0 z-50 flex h-16 items-center justify-between border-b-1 px-6 text-white backdrop-blur-sm min-[3000px]:text-lg md:h-20 md:px-20">
      <div className="text-lg font-bold">Logo</div>
      {isHomePage && (
        <div className="flex items-center gap-3 md:gap-12">
          <Link className="max-md:order-2" href={"/wallet"}>
            <div className="flex h-9 items-center rounded-full border-t-1 border-t-gray-800 bg-[#0E161F] p-3 md:h-12">
              <p className="text-sm">🪙 5000</p>
            </div>
          </Link>
          <p className="max-md:invisible max-md:order-1 md:text-lg">
            Welcome, John Doe
          </p>
        </div>
      )}
    </div>
  );
};

export default HomeNavbar;
