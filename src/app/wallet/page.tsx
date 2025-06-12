"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const transactions = [
  {
    id: 1,
    type: "withdraw",
    amount: 500.0,
    date: "2023-10-01",
    time: "10:00 AM",
    image: "/icons/withdraw-black.png", // Example image path
  },
  {
    id: 2,
    type: "add",
    amount: 1000.0,
    date: "2023-10-02",
    time: "11:00 AM",
    image: "/icons/add-black.png", // Example image path
  },
  {
    id: 3,
    type: "withdraw",
    amount: 200.0,
    date: "2023-10-03",
    time: "12:00 PM",
    image: "/icons/withdraw-black.png", // Example image path
  },
  {
    id: 4,
    type: "add",
    amount: 1500.0,
    date: "2023-10-04",
    time: "01:00 PM",
    image: "/icons/add-black.png", // Example image path
  },
  {
    id: 5,
    type: "withdraw",
    amount: 300.0,
    date: "2023-10-05",
    time: "02:00 PM",
    image: "/icons/withdraw-black.png", // Example image path
  },
];

const bonusTransactions = [
  {
    id: 1,
    type: "bonus",
    amount: 100.0,
    date: "2023-10-01",
    time: "09:00 AM",
    image: "/icons/withdraw-black.png",
  },
  // Add more bonus transactions as needed
];

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState<"wallet" | "bonus">("wallet");

  return (
    <section className="static flex h-[90vh] flex-col gap-5 px-5 py-5 font-bold text-white md:ml-48 md:px-20 lg:px-40 xl:px-60">
      <p className="text-4xl">Wallet</p>
      <div className="flex w-full items-center justify-center gap-1 rounded-full border-t-2 border-t-[#202c38] bg-[#0E161F] px-3 py-2">
        <Button
          variant={activeTab === "wallet" ? "secondary" : "ghost"}
          size={"lg"}
          className={`w-1/2 font-thin ${activeTab === "wallet" ? "" : "bg-[#0E161F] text-white"}`}
          onClick={() => setActiveTab("wallet")}
        >
          Wallet
        </Button>
        <Button
          variant={activeTab === "bonus" ? "secondary" : "ghost"}
          size={"lg"}
          className={`w-1/2 font-thin ${activeTab === "bonus" ? "" : "bg-[#0E161F] text-white"}`}
          onClick={() => setActiveTab("bonus")}
        >
          Bonus
        </Button>
      </div>

      {activeTab === "wallet" ? (
        <>
          <div className="flex flex-col items-start gap-2 rounded-xl bg-gradient-to-b from-[#DC83FB] via-[#952FD3] to-[#4D116C] p-3">
            <p className="font-light">Available Balance</p>
            <p className="text-3xl">₹{2000}</p>
            <div className="mt-5 flex w-full flex-row justify-evenly gap-3 sm:w-auto sm:gap-4">
              <Link href={"/wallet/add-money"} className="">
                <Button
                  size={"lg"}
                  className="flex items-center justify-center bg-[#8D45B5] text-white hover:bg-[#8D45B5]/80"
                >
                  <Image
                    src="/icons/add.png"
                    alt="Add Money"
                    width={18}
                    height={18}
                    className="mr-2"
                  />
                  Add Money
                </Button>
              </Link>
              <Link href={"/wallet/withdraw"}>
                <Button
                  size={"lg"}
                  className="flex items-center justify-center bg-[#8D45B5] text-white hover:bg-[#8D45B5]/80"
                >
                  <Image
                    src="/icons/withdraw.png"
                    alt="Withdraw Money"
                    width={18}
                    height={18}
                    className="mr-2"
                  />
                  Withdraw
                </Button>
              </Link>
            </div>
          </div>
          <div className="max-md:mb-20">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-light">Transaction History</p>
              <Link href="/wallet/transactions">View All</Link>
            </div>
            <div className="h-66 overflow-y-scroll md:h-100">
              {transactions.map(transaction => (
                <div
                  key={transaction.id}
                  className="mb-2 flex items-center justify-between rounded-xl bg-[#0E161F] p-4"
                >
                  <div className="flex items-center justify-center rounded-full bg-[#4BE0F1] p-4">
                    <Image
                      src={transaction.image}
                      alt={transaction.type}
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="flex flex-col gap-1 text-start md:text-xl">
                    <div>
                      {transaction.type === "withdraw"
                        ? "Withdraw Amount"
                        : "Add Amount"}
                    </div>
                    <div className="flex items-start text-sm text-gray-400">
                      <div className="border-r-1 border-r-gray-500 pr-2">
                        {transaction.date}
                      </div>
                      <div className="pl-2">{transaction.time}</div>
                    </div>
                  </div>
                  {transaction.type === "add" ? (
                    <div className="text-sm text-green-400">
                      + ₹{transaction.amount.toFixed(2)}
                    </div>
                  ) : (
                    <div className="text-sm text-red-600">
                      - ₹{transaction.amount.toFixed(2)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-start gap-2 rounded-xl bg-gradient-to-b from-[#DC83FB] via-[#952FD3] to-[#4D116C] p-3">
            <p className="font-light">Available Bonus</p>
            <p className="text-3xl">₹{500}</p>
            <div className="mx-2 flex w-full justify-center text-center text-wrap sm:mx-5 sm:w-auto sm:justify-evenly sm:text-left">
              <p>Bonus can&apos;t be withdrawn. Use it to Play games.</p>
            </div>
          </div>
          <div className="max-md:pb-20">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-light">Bonus History</p>
            </div>
            {bonusTransactions.map(transaction => (
              <div
                key={transaction.id}
                className="mb-2 flex items-center justify-between rounded-xl bg-[#0E161F] p-4"
              >
                <div className="flex items-center justify-center rounded-full bg-[#4BE0F1] p-4">
                  <Image
                    src={transaction.image}
                    alt={transaction.type}
                    width={20}
                    height={20}
                  />
                </div>
                <div className="flex flex-col gap-1 text-start md:text-xl">
                  <div>Bonus Credited</div>
                  <div className="flex items-start text-sm text-gray-400">
                    <div className="border-r-1 border-r-gray-500 pr-2">
                      {transaction.date}
                    </div>
                    <div className="pl-2">{transaction.time}</div>
                  </div>
                </div>
                <div className="text-sm text-green-400">
                  + ₹{transaction.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default WalletPage;
