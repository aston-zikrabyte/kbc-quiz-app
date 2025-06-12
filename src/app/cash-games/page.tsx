"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const CashGames = () => {
  const [activeTab, setActiveTab] = useState<"singleplayer" | "multiplayer">(
    "singleplayer"
  );

  const [activeMultiplayer, setActiveMultiplayer] = useState<
    "withOne" | "withFive" | null
  >(null);

  const [activeAmount, setActiveAmount] = useState<
    | "single-25"
    | "single-50"
    | "single-100"
    | "multiplayer1v1-50"
    | "multiplayer1v1-100"
    | "multiplayer1v5-50"
    | "multiplayer1v5-100"
    | "multiplayer1v5-150"
    | null
  >(null);

  return (
    <div className="flex h-[90vh] flex-col gap-5 px-5 py-5 font-bold text-white sm:px-20 md:px-30 lg:px-50 xl:px-70">
      <p className="text-4xl">Cash Games</p>
      <div className="flex w-full items-center justify-center gap-1 rounded-full border-t-2 border-t-[#202c38] bg-[#0E161F] px-3 py-2">
        <Button
          variant={activeTab === "singleplayer" ? "secondary" : "ghost"}
          size={"lg"}
          className={`w-1/2 font-thin ${activeTab === "singleplayer" ? "" : "bg-[#0E161F] text-white"}`}
          onClick={() => {
            setActiveTab("singleplayer");
            setActiveMultiplayer(null);
            setActiveAmount(null);
          }}
        >
          SINGLE PLAYER
        </Button>
        <Button
          variant={activeTab === "multiplayer" ? "secondary" : "ghost"}
          size={"lg"}
          className={`w-1/2 font-thin ${activeTab === "multiplayer" ? "" : "bg-[#0E161F] text-white"}`}
          onClick={() => {
            setActiveTab("multiplayer");
            setActiveAmount(null);
          }}
        >
          MULTI PLAYER
        </Button>
      </div>

      {activeTab === "singleplayer" ? (
        <>
          <div className="flex flex-col gap-6">
            <div className="rounded-lg border-t-2 border-t-[#202c38] bg-[#0E161F] p-4 pb-7">
              <p className="text-lg">You vs Computer</p>
              <p className="text-sm font-thin text-gray-400">Play against AI</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-lg">SELECT AMOUNT</p>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                <div
                  className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md ${activeAmount === "single-25" ? "bg-[#AB39E8]" : "border-t-2 border-t-[#202c38] bg-[#0E161F]"} p-2`}
                  onClick={() => setActiveAmount("single-25")}
                >
                  <p className="text-2xl">🪙</p>
                  <p className="text-sm">₹25</p>
                  <div
                    className={`flex w-full items-center justify-center rounded-full ${activeAmount === "single-25" ? "bg-[#bc6ce7]" : "bg-[#4BE0F1]/14"} p-1`}
                  >
                    <p className="text-xs">
                      Winning Prize:{" "}
                      <span
                        className={`${activeAmount === "single-25" ? "text-white" : "text-[#4BE0F1]"}`}
                      >
                        ₹50
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md ${activeAmount === "single-50" ? "bg-[#AB39E8]" : "border-t-2 border-t-[#202c38] bg-[#0E161F]"} p-2`}
                  onClick={() => setActiveAmount("single-50")}
                >
                  <p className="text-2xl">🪙</p>
                  <p className="text-sm">₹50</p>
                  <div
                    className={`flex w-full items-center justify-center rounded-full ${activeAmount === "single-50" ? "bg-[#bc6ce7]" : "bg-[#4BE0F1]/14"} p-1`}
                  >
                    <p className="text-xs">
                      Winning Prize:{" "}
                      <span
                        className={`${activeAmount === "single-50" ? "text-white" : "text-[#4BE0F1]"}`}
                      >
                        ₹100
                      </span>
                    </p>
                  </div>
                </div>
                <div
                  className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md ${activeAmount === "single-100" ? "bg-[#AB39E8]" : "border-t-2 border-t-[#202c38] bg-[#0E161F]"} p-2`}
                  onClick={() => setActiveAmount("single-100")}
                >
                  <p className="text-2xl">🪙</p>
                  <p className="text-sm">₹100</p>
                  <div
                    className={`flex w-full items-center justify-center rounded-full ${activeAmount === "single-100" ? "bg-[#bc6ce7]" : "bg-[#4BE0F1]/14"} p-1`}
                  >
                    <p className="text-xs">
                      Winning Prize:{" "}
                      <span
                        className={`${activeAmount === "single-100" ? "text-white" : "text-[#4BE0F1]"}`}
                      >
                        ₹200
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            <Button size={"lg"}>Join Room</Button>
            <p>SELECT PLAYERS</p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div
                className={`cursor-pointer rounded-lg border-t-2 border-t-[#202c38] ${activeMultiplayer === "withOne" ? "bg-[#AB39E8]" : "bg-[#0E161F]"} p-4 pb-7`}
                onClick={() => {
                  setActiveMultiplayer("withOne");
                  setActiveAmount(null);
                }}
              >
                <p className="text-lg">1 v/s 1</p>
                <p
                  className={`text-sm font-thin ${activeMultiplayer === "withOne" ? "" : "text-gray-400"}`}
                >
                  Compete with a single player
                </p>
              </div>
              <div
                className={`cursor-pointer rounded-lg border-t-2 border-t-[#202c38] ${activeMultiplayer === "withFive" ? "bg-[#AB39E8]" : "bg-[#0E161F]"} p-4 pb-7`}
                onClick={() => {
                  setActiveMultiplayer("withFive");
                  setActiveAmount(null);
                }}
              >
                <p className="text-lg">1 v/s 5</p>
                <p
                  className={`text-sm font-thin ${activeMultiplayer === "withFive" ? "" : "text-gray-400"}`}
                >
                  Compete in a group
                </p>
              </div>
            </div>
            {activeMultiplayer === "withOne" ? (
              <div className="flex flex-col gap-3 md:mb-20">
                <p>SELECT AMOUNT</p>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                  <div
                    className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md ${activeAmount === "multiplayer1v1-50" ? "bg-[#AB39E8]" : "border-t-2 border-t-[#202c38] bg-[#0E161F]"} p-2`}
                    onClick={() => {
                      setActiveAmount("multiplayer1v1-50");
                    }}
                  >
                    <p className="text-2xl">🪙</p>
                    <p className="text-sm">₹50</p>
                    <div
                      className={`flex w-full items-center justify-center rounded-full ${activeAmount === "multiplayer1v1-50" ? "bg-[#bc6ce7]" : "bg-[#4BE0F1]/14"} p-1`}
                    >
                      <p className="text-xs">
                        Winning Prize:{" "}
                        <span
                          className={`${activeAmount === "multiplayer1v1-50" ? "text-white" : "text-[#4BE0F1]"}`}
                        >
                          ₹100
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md ${activeAmount === "multiplayer1v1-100" ? "bg-[#AB39E8]" : "border-t-2 border-t-[#202c38] bg-[#0E161F]"} p-2`}
                    onClick={() => setActiveAmount("multiplayer1v1-100")}
                  >
                    <p className="text-2xl">🪙</p>
                    <p className="text-sm">₹100</p>
                    <div
                      className={`flex w-full items-center justify-center rounded-full ${activeAmount === "multiplayer1v1-100" ? "bg-[#bc6ce7]" : "bg-[#4BE0F1]/14"} p-1`}
                    >
                      <p className="text-xs">
                        Winning Prize:{" "}
                        <span
                          className={`${activeAmount === "multiplayer1v1-100" ? "text-white" : "text-[#4BE0F1]"}`}
                        >
                          ₹200
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : activeMultiplayer === "withFive" ? (
              <div className="mb-20 flex flex-col gap-3">
                <p>SELECT AMOUNT</p>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                  <div
                    className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md ${activeAmount === "multiplayer1v5-50" ? "bg-[#AB39E8]" : "border-t-2 border-t-[#202c38] bg-[#0E161F]"} p-2`}
                    onClick={() => setActiveAmount("multiplayer1v5-50")}
                  >
                    <p className="text-2xl">🪙</p>
                    <p className="text-sm">₹50</p>
                    <div
                      className={`flex w-full items-center justify-center rounded-full ${activeAmount === "multiplayer1v5-50" ? "bg-[#bc6ce7]" : "bg-[#4BE0F1]/14"} p-1`}
                    >
                      <p className="text-xs">
                        Winning Prize:{" "}
                        <span
                          className={`${activeAmount === "multiplayer1v5-50" ? "text-white" : "text-[#4BE0F1]"}`}
                        >
                          ₹300
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md ${activeAmount === "multiplayer1v5-100" ? "bg-[#AB39E8]" : "border-t-2 border-t-[#202c38] bg-[#0E161F]"} p-2`}
                    onClick={() => setActiveAmount("multiplayer1v5-100")}
                  >
                    <p className="text-2xl">🪙</p>
                    <p className="text-sm">₹100</p>
                    <div
                      className={`flex w-full items-center justify-center rounded-full ${activeAmount === "multiplayer1v5-100" ? "bg-[#bc6ce7]" : "bg-[#4BE0F1]/14"} p-1`}
                    >
                      <p className="text-xs">
                        Winning Prize:{" "}
                        <span
                          className={`${activeAmount === "multiplayer1v5-100" ? "text-white" : "text-[#4BE0F1]"}`}
                        >
                          ₹600
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md ${activeAmount === "multiplayer1v5-150" ? "bg-[#AB39E8]" : "border-t-2 border-t-[#202c38] bg-[#0E161F]"} p-2`}
                    onClick={() => setActiveAmount("multiplayer1v5-150")}
                  >
                    <p className="text-2xl">🪙</p>
                    <p className="text-sm">₹150</p>
                    <div
                      className={`flex w-full items-center justify-center rounded-full ${activeAmount === "multiplayer1v5-150" ? "bg-[#bc6ce7]" : "bg-[#4BE0F1]/14"} p-1`}
                    >
                      <p className="text-xs">
                        Winning Prize:{" "}
                        <span
                          className={`${activeAmount === "multiplayer1v5-150" ? "text-white" : "text-[#4BE0F1]"}`}
                        >
                          ₹800
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </>
      )}
      <div className="fixed bottom-5 left-0 mt-auto w-full px-5 md:px-30 lg:px-60 xl:px-80">
        <Button
          size={"lg"}
          className="w-full"
          disabled={activeAmount !== null ? false : true}
        >
          Select Topic
        </Button>
      </div>
    </div>
  );
};

export default CashGames;
