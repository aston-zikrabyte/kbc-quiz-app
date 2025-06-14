import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const leaderboardData = [
  { name: "leader1", score: 100, time: "21 min", answered: 5 },
  { name: "leader2", score: 90, time: "18 min", answered: 4 },
  { name: "leader3", score: 80, time: "15 min", answered: 3 },
  { name: "Serenity", score: 70, time: "12 min", answered: 2 },
  { name: "Ava", score: 65, time: "10 min", answered: 2 },
  { name: "Ethan", score: 60, time: "9 min", answered: 2 },
  { name: "Mia", score: 55, time: "8 min", answered: 1 },
  { name: "Noah", score: 50, time: "7 min", answered: 1 },
  { name: "Liam", score: 45, time: "6 min", answered: 1 },
  { name: "Olivia", score: 40, time: "5 min", answered: 1 },
];

const LeaderboardPage = () => {
  return (
    <section className="static flex h-auto flex-col gap-5 px-5 pt-5 font-bold text-white max-md:pb-14 md:ml-48 md:px-20 lg:px-40 xl:px-60">
      <p className="text-4xl">Leaderboard</p>
      <div>
        <div className="grid h-70 grid-flow-col grid-rows-3">
          <div className="row-span-2 row-start-2 rounded-t-2xl border-2 border-r-0 border-b-0 border-[#202c38] bg-[#0E161F]/80 p-2">
            <div className="flex flex-col items-center p-2">
              <div className="flex flex-col items-center">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src="/img/avatar_img2.jpg"
                    alt="Second"
                    className="h-full w-full rounded-full object-cover"
                  />
                  <AvatarFallback>Second</AvatarFallback>
                </Avatar>
                <p className="z-10 -mt-2 text-3xl">🥈</p>
              </div>
              <p className="mt-2 text-lg font-semibold">
                {leaderboardData[1].name}
              </p>
              <p className="text-base text-gray-400">
                {leaderboardData[1].score} pts
              </p>
            </div>
          </div>
          <div className="row-span-3 row-end-4 rounded-t-2xl border-2 border-b-0 border-[#202c38] bg-[#0E161F]/80 p-2">
            <div className="flex flex-col items-center p-2">
              <div className="flex flex-col items-center">
                <Image
                  className="z-10"
                  src={"/icons/purple-crown.png"}
                  alt="crown"
                  height={34}
                  width={34}
                />
                <Avatar className="-mt-1 h-16 w-16">
                  <AvatarImage
                    src="/img/avatar_img1.jpg"
                    alt="First"
                    className="h-full w-full rounded-full object-cover"
                  />
                  <AvatarFallback>First</AvatarFallback>
                </Avatar>
                <p className="z-10 -mt-2 text-3xl">🥇</p>
              </div>
              <p className="mt-2 text-lg font-semibold">
                {leaderboardData[0].name}
              </p>
              <p className="text-base text-gray-400">
                {leaderboardData[0].score} pts
              </p>
            </div>
          </div>
          <div className="row-start-2 row-end-4 rounded-t-2xl border-2 border-b-0 border-l-0 border-[#202c38] bg-[#0E161F]/80 p-2">
            <div className="flex flex-col items-center p-2">
              <div className="flex flex-col items-center">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src="/img/avatar_img3.jpg"
                    alt="Third"
                    className="h-full w-full rounded-full object-cover"
                  />
                  <AvatarFallback>Third</AvatarFallback>
                </Avatar>
                <p className="z-10 -mt-2 text-3xl">🥉</p>
              </div>
              <p className="mt-2 text-lg font-semibold">
                {leaderboardData[2].name}
              </p>
              <p className="text-base text-gray-400">
                {leaderboardData[2].score} pts
              </p>
            </div>
          </div>
        </div>
        <div className="h-full rounded-b-3xl border-2 border-b-0 border-[#232424] bg-[#0E161F]/50 p-4">
          <div className="my-3">
            <p>Your position:</p>
          </div>
          <div className="flex h-20 items-center gap-3 rounded-2xl bg-gray-700 p-3">
            <p className="py-3 pl-4 text-lg">💪</p>
            <p>Keep pushing</p>
          </div>
          <div className="my-3 h-50 overflow-y-scroll">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="px-3 py-2 font-bold text-[#4BE0F1]">#</th>
                  <th className="px-3 py-2 font-bold">Name</th>
                  <th className="px-3 py-2 font-bold">Score</th>
                  <th className="px-3 py-2 font-bold">Time Taken</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.slice(3).map((leader, index) => (
                  <tr key={index} className="border-t border-gray-700">
                    <td className="px-3 py-2">
                      <span className="rounded-full bg-[#1F3335] px-3.5 py-1 text-lg text-[#4BE0F1]">
                        {index + 4}
                      </span>
                    </td>
                    <td className="px-3 py-2">{leader.name}</td>
                    <td className="px-3 py-2 text-gray-400">{leader.score}</td>
                    <td className="px-3 py-2">
                      <span className="inline-flex items-center gap-1 text-gray-400">
                        <Image
                          src="/icons/clock.png"
                          alt="clock"
                          height={16}
                          width={16}
                        />
                        {leader.time}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderboardPage;
