"use client";

import { getSession } from "@/app/_lib/auth";
import Loading from "@/components/custom_components/Loading";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

const PracticeGames = () => {
  const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"singleplayer" | "multiplayer">(
    "singleplayer"
  );

  const [activeMultiplayer, setActiveMultiplayer] = useState<number | null>(
    null
  );

  const [activeAmount, setActiveAmount] = useState<string | null>(null);

  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  type GameSetting = {
    player_type: string;
    available_amounts: { amount: number; winning_price: number }[];
    _id: string;
    num_of_players: number;
  };

  const [gameSettings, setGameSettings] = useState<GameSetting[]>([]);

  type CategoryType = {
    _id: string;
    category: string;
  };
  const [categories, setCategories] = useState<CategoryType[]>();

  const selectAmount = (amount: string | null) => {
    setActiveAmount(amount);
    setActiveTopic(null);
  };

  useEffect(() => {
    async function fetchSession() {
      const session = await getSession();
      const access_token = session?.access_token ?? "";
      setAccessToken(access_token);
    }
    fetchSession();
  }, []);

  useEffect(() => {
    async function fetchSettings() {
      if (!accessToken) return;
      const response = await fetch(
        `${ServerUrl}kbc_admin/manage-game-setups/?game_mode=practice_mode&status=active`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        setIsLoading(false);
        const data = await response.json();
        if (data.settings) setGameSettings(data.settings);
      }
    }
    fetchSettings();
  }, [accessToken]);

  useEffect(() => {
    async function fetchCategories() {
      if (!accessToken) return;
      const response = await fetch(
        `${ServerUrl}kbc_admin/handle-categories/?status=active`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        setIsLoading(false);
        const data = await response.json();
        if (data.categories) setCategories(data.categories);
      }
    }
    fetchCategories();
  }, [accessToken]);

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
            setActiveTopic(null);
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
            setActiveTopic(null);
          }}
        >
          MULTI PLAYER
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          {activeTab === "singleplayer" ? (
            <>
              <div className="flex flex-col gap-6 md:mb-20">
                <div className="rounded-lg border-t-2 border-t-[#202c38] bg-[#0E161F] p-4 pb-7">
                  <p className="text-lg">You vs Computer</p>
                  <p className="text-sm font-thin text-gray-400">
                    Play against AI
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-lg">SELECT AMOUNT</p>
                  <div className="grid grid-cols-2 gap-6">
                    {gameSettings &&
                      gameSettings
                        .filter(setting => setting["player_type"] === "single")
                        .map(item =>
                          item["available_amounts"].map(
                            (
                              amount: {
                                amount:
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | React.ReactElement<string>
                                  | Iterable<React.ReactNode>
                                  | React.ReactPortal
                                  | Promise<React.AwaitedReactNode>
                                  | null
                                  | undefined;
                                winning_price:
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | React.ReactElement<string>
                                  | Iterable<React.ReactNode>
                                  | React.ReactPortal
                                  | Promise<React.AwaitedReactNode>
                                  | null
                                  | undefined;
                              },
                              index: React.Key | null | undefined
                            ) => (
                              <div
                                key={index}
                                className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md ${activeAmount === `${amount.amount}` ? "bg-[#AB39E8]" : "border-t-2 border-t-[#202c38] bg-[#0E161F]"} p-2`}
                                onClick={() => selectAmount(`${amount.amount}`)}
                              >
                                <p className="text-2xl">🪙</p>
                                <p className="text-sm">₹{amount.amount}</p>
                                <div
                                  className={`flex w-full items-center justify-center rounded-full ${activeAmount === `${amount.amount}` ? "bg-[#bc6ce7]" : "bg-[#4BE0F1]/14"} p-1`}
                                >
                                  <p className="text-xs">
                                    Winning Prize:{" "}
                                    <span
                                      className={`${activeAmount === amount.amount ? "text-white" : "text-[#4BE0F1]"}`}
                                    >
                                      ₹{amount.winning_price}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            )
                          )
                        )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-6">
                <Button size={"lg"}>Join Room</Button>
                <p>SELECT PLAYERS</p>
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                  {gameSettings &&
                    gameSettings
                      .filter(setting => setting.player_type === "multi")
                      .sort((a, b) => a.num_of_players - b.num_of_players)
                      .map(item => (
                        <div
                          key={item["_id"]}
                          className={`cursor-pointer rounded-lg border-t-2 border-t-[#202c38] ${activeMultiplayer === item.num_of_players ? "bg-[#AB39E8]" : "bg-[#0E161F]"} p-4 pb-7`}
                          onClick={() => {
                            setActiveMultiplayer(item.num_of_players);
                            setActiveAmount(null);
                            setActiveTopic(null);
                          }}
                        >
                          <p className="text-lg">
                            1 v/s {item.num_of_players - 1}
                          </p>
                          <p
                            className={`text-sm font-thin ${activeMultiplayer === item.num_of_players ? "" : "text-gray-400"}`}
                          >
                            {item.num_of_players == 2
                              ? "Compete with a single player"
                              : "Compete in a group"}
                          </p>
                        </div>
                      ))}
                </div>

                {activeMultiplayer && (
                  <div className="flex flex-col gap-3 md:mb-20">
                    <p>SELECT AMOUNT</p>
                    <div className="grid grid-cols-2 gap-6 md:mb-20">
                      {gameSettings
                        .filter(
                          setting =>
                            setting.player_type === "multi" &&
                            setting.num_of_players == activeMultiplayer
                        )
                        .flatMap(setting =>
                          setting.available_amounts
                            .sort((a, b) => a.amount - b.amount)
                            .map(amount => {
                              // Build a unique key and value for activeAmount
                              const amountKey = `${setting.num_of_players - 1}-${amount.amount}`;
                              return (
                                <div
                                  key={setting._id + "-" + amount.amount}
                                  className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-md ${
                                    activeAmount === amountKey
                                      ? "bg-[#AB39E8]"
                                      : "border-t-2 border-t-[#202c38] bg-[#0E161F]"
                                  } p-2`}
                                  onClick={() => selectAmount(amountKey)}
                                >
                                  <p className="text-2xl">🪙</p>
                                  <p className="text-sm">₹{amount.amount}</p>
                                  <div
                                    className={`flex w-full items-center justify-center rounded-full ${
                                      activeAmount === amountKey
                                        ? "bg-[#bc6ce7]"
                                        : "bg-[#4BE0F1]/14"
                                    } p-1`}
                                  >
                                    <p className="text-xs">
                                      Winning Prize:{" "}
                                      <span
                                        className={`${
                                          activeAmount === amountKey
                                            ? "text-white"
                                            : "text-[#4BE0F1]"
                                        }`}
                                      >
                                        ₹{amount.winning_price}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              );
                            })
                        )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex justify-center max-md:mb-20">
          <div className="flex min-h-max w-full max-w-md flex-col gap-3 rounded-xl p-4 shadow-lg">
            {/* <h2 className="mb-4 text-2xl font-bold">Select Topic</h2> */}
            <h2 className="mb-4 font-bold">
              {activeAmount == null
                ? "SELECT AMOUNT AND TO SELECT TOPIC"
                : "SELECT TOPIC"}
            </h2>
            {categories &&
              categories.map(category => (
                <div
                  key={category._id}
                  className={`w-full rounded-lg ${activeTopic === category.category ? "bg-[#bc6ce7]" : "border-t-2 border-t-[#202c38] bg-[#0E161F]"} p-4 ${!activeAmount ? "pointer-events-none cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                  onClick={() =>
                    activeAmount && setActiveTopic(category.category)
                  }
                >
                  <p>{category.category}</p>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 left-0 mt-auto w-full px-5 md:px-30 lg:px-60 xl:px-80">
        <Button
          size={"lg"}
          className="w-full"
          disabled={activeTopic !== null ? false : true}
        >
          Create Room
        </Button>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default PracticeGames;
