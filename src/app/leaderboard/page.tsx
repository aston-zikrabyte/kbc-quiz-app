import Image from "next/image";
import React from "react";

const leaderboardData = [
  { name: "leader1", score: 100, time: "21 min", answered: 5 },
  { name: "leader2", score: 90, time: "18 min", answered: 4 },
  { name: "leader3", score: 80, time: "15 min", answered: 3 },
  { name: "Serenity", score: 70, time: "12 min", answered: 2 },
];

const RewardsPage = () => {
  return (
    <section className="static flex h-[90vh] flex-col gap-5 px-5 py-5 font-bold text-white md:ml-48 md:px-20 lg:px-40 xl:px-60">
      <p className="text-4xl">Leaderboard</p>
      <div>
        <div className="grid h-60 grid-flow-col grid-rows-3">
          <div className="row-span-2 row-start-2 rounded-t-2xl border-2 border-r-0 bg-purple-400 p-2">
            leader2
          </div>
          <div className="row-span-3 row-end-4 rounded-t-2xl border-2 bg-slate-400 p-2">
            leader1
          </div>
          <div className="row-start-2 row-end-4 rounded-t-2xl border-2 border-l-0 bg-purple-400 p-2">
            leader3
          </div>
        </div>
        <div className="h-full rounded-t-3xl border-2 border-b-0 border-[#232424] bg-[#191B1B] p-4">
          <div className="my-3">
            <p>Your position:</p>
          </div>
          <div className="flex h-20 items-center gap-3 rounded-2xl bg-gray-700 p-3">
            <p className="rounded-full bg-gray-800 px-4 py-3 text-lg">💪</p>
            <p>Keep pushing</p>
          </div>
          <div className="my-3">
            {leaderboardData.map((leader, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-t-1 border-t-gray-700 px-3 py-3 font-thin xl:px-10"
              >
                <div className="flex items-center gap-1">
                  <p className="rounded-full bg-[#1F3335] px-3.5 py-1 text-lg text-[#4BE0F1]">
                    {index + 1}
                  </p>
                  <p>{leader.name}</p>
                </div>
                <p className="text-gray-400">{leader.answered}/11 Ans.</p>
                <div className="flex items-center gap-1">
                  <Image
                    src="/icons/clock.png"
                    alt="clock"
                    height={16}
                    width={16}
                  />
                  <p className="text-gray-400">{leader.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RewardsPage;
