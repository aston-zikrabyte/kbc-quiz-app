"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";

const AddMoney = () => {
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex h-[90vh] flex-col gap-5 px-5 py-5 font-bold text-white sm:px-20 md:px-40 lg:px-60 xl:px-80">
      <p className="text-4xl">Add Money</p>
      <div className="sm:w-1/2">
        <label htmlFor="amount">Add Amount</label>
        <div className="mt-3 flex items-center gap-2 rounded-full border-t-2 border-t-[#202c38] bg-[#0E161F]/80 px-5 py-3">
          <FaRupeeSign className="text-gray-500" />
          <input
            type="text"
            name="amount"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const value: string = e.target.value;
              // Only allow if the entire value contains only numbers
              if (/^[0-9]*$/.test(value)) {
                // Update your state here
                setAmount(Number(value));
              }
            }}
            placeholder="Enter Amount"
            value={amount}
            defaultValue={0}
            className="w-full focus:border-none focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-4">
        <p>Recharge packs</p>
        <div className="mt-3 grid w-full grid-cols-2 gap-4">
          <div
            className="flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-t-2 border-t-[#202c38] bg-[#0E161F]/90"
            onClick={() => setAmount(100)}
          >
            <p>₹100</p>
            <p className="text-3xl">🪙</p>
            <p className="text-sm font-thin text-gray-500">100 Coins</p>
          </div>
          <div
            className="flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-t-2 border-t-[#202c38] bg-[#0E161F]/90"
            onClick={() => setAmount(200)}
          >
            <p>₹200</p>
            <p className="text-3xl">🪙</p>
            <p className="text-sm font-thin text-gray-500">170 Coins</p>
          </div>
          <div
            className="flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-t-2 border-t-[#202c38] bg-[#0E161F]/90"
            onClick={() => setAmount(500)}
          >
            <p>₹500</p>
            <p className="text-3xl">🪙</p>
            <p className="text-sm font-thin text-gray-500">450 Coins</p>
          </div>
          <div
            className="flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-t-2 border-t-[#202c38] bg-[#0E161F]/90"
            onClick={() => setAmount(1000)}
          >
            <p>₹1000</p>
            <p className="text-3xl">🪙</p>
            <p className="text-sm font-thin text-gray-500">900 Coins</p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-5 left-0 mt-auto w-full px-5 md:px-30 lg:px-60 xl:px-80">
        <Button
          size={"lg"}
          className="w-full"
          disabled={amount !== 0 ? false : true}
        >
          Select Topic
        </Button>
      </div>
    </div>
  );
};

export default AddMoney;
