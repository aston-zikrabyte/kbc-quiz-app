import { Button } from "@/components/ui/button";
import React from "react";

const PlayArea = () => {
  return (
    <div className="static flex h-auto flex-col items-center px-5 pt-5 font-bold text-white max-md:pb-14 md:px-40 lg:px-40 xl:px-60">
      <div className="relative mb-20 flex w-full flex-col items-center gap-5 sm:w-130">
        <div className="absolute flex size-12 items-center justify-center rounded-full border-3 border-[#AB39E8] bg-black/20">
          10
        </div>
        <div className="mt-5 flex h-50 w-full flex-col items-center justify-center gap-5 rounded-2xl border-t-2 border-t-[#202c38] bg-[#0E161F]/80 p-6 text-center">
          <div className="rounded-full border-t-1 border-t-[#51D7D7] bg-[#51D7D7]/10 px-4 py-2 text-[#51D7D7]">
            Question x of y
          </div>
          <p>Who won the 2024 Wimbledon Men&apos;s Singles title?</p>
        </div>
        <div className="w-full rounded-xl border-t-2 border-t-[#202c38] bg-[#0E161F]/80 p-4">
          <span className="mr-2 rounded-lg bg-gray-600 px-3 py-2">A.</span>{" "}
          Carlos Alcaraz
        </div>
        <div className="w-full rounded-xl border-t-2 border-t-[#202c38] bg-[#0E161F]/80 p-4">
          <span className="mr-2 rounded-lg bg-gray-600 px-3 py-2">A.</span>{" "}
          Carlos Alcaraz
        </div>
        <div className="w-full rounded-xl border-t-2 border-t-[#202c38] bg-[#0E161F]/80 p-4">
          <span className="mr-2 rounded-lg bg-gray-600 px-3 py-2">A.</span>{" "}
          Carlos Alcaraz
        </div>
        <div className="w-full rounded-xl border-t-2 border-t-[#202c38] bg-[#0E161F]/80 p-4">
          <span className="mr-2 rounded-lg bg-gray-600 px-3 py-2">A.</span>{" "}
          Carlos Alcaraz
        </div>
      </div>
      <div className="fixed bottom-5 left-0 mt-auto w-full px-10 md:px-50 lg:px-80 xl:px-100">
        <Button size={"lg"} className="w-full" disabled={true}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PlayArea;
