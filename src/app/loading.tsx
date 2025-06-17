"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="flex flex-row gap-2">
        <div className="h-4 w-4 animate-bounce rounded-full bg-[#53DBDB]" />
        <div className="h-4 w-4 animate-bounce rounded-full bg-[#53DBDB] [animation-delay:-.3s]" />
        <div className="h-4 w-4 animate-bounce rounded-full bg-[#53DBDB] [animation-delay:-.5s]" />
      </div>
    </div>
  );
};

export default Loading;
