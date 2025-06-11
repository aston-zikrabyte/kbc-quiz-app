import { usePathname } from "next/navigation";
import React from "react";

const HomeNavbar = () => {
  const pathname = usePathname();
  const isLoggedIn = pathname === "/home";
  return (
    <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b-1 border-b-gray-800 px-6 text-white backdrop-blur-sm min-[3000px]:text-lg md:h-20 md:px-20">
      <div className="text-lg font-bold">Logo</div>
      {isLoggedIn && (
        <div className="flex items-center gap-4">
          <p className="md:text-lg">Welcome, John Doe</p>
          <div className="flex h-12 items-center rounded-full border-t-1 border-t-gray-800 bg-[#0E161F] p-3">
            <p className="text-sm">🪙 5000</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeNavbar;
