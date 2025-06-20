"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSession } from "@/app/_lib/auth";
import Loading from "@/components/custom_components/Loading";

const HomePage = () => {
  const ServerUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  type Banner = {
    id: string | number;
    title?: string;
    description?: string;
    image?: string;
  };

  const [bannerData, setBannerData] = useState<Banner[]>([]);
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      let access_token = "";
      const session = await getSession();
      if (session && session.access_token) {
        access_token = session.access_token;
        setAccessToken(access_token);
      }
    }
    fetchSession();
  }, []);

  useEffect(() => {
    async function fetchBanner() {
      if (!accessToken) return;
      const response = await fetch(`${ServerUrl}game/fetch-banners/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        setIsLoading(false);
        const data = await response.json();
        setBannerData(data.banners);
      }
    }
    fetchBanner();
  }, [accessToken]);
  return (
    <div className="static h-[90vh] flex-col justify-center px-5 py-5 text-2xl font-bold text-white max-[400px]:mb-24 md:ml-48 md:px-20">
      <div className="mb-5 flex items-center justify-end gap-3">
        {/* <div className="rounded-full border-t-1 border-t-gray-800 bg-[#0E161F] p-3">
          <Image
            src={"/icons/notification.png"}
            alt="bell"
            height={24}
            width={24}
          />
        </div> */}
      </div>
      <div className="mb-10">
        <Carousel
          plugins={[Autoplay({ delay: 5000 })]}
          opts={{
            loop: true,
          }}
        >
          <CarouselContent className="h-60">
            {bannerData &&
              bannerData.map(item => (
                <CarouselItem key={item?.id}>
                  <div className="h-full rounded-2xl bg-purple-400 p-4 text-center">
                    <h2 className="text-xl font-bold">{item?.title}</h2>
                    <p className="mt-2">{item?.description}</p>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="flex flex-col justify-center gap-3">
        <p>PLAY GAMES</p>
        <div className="flex h-55 justify-between gap-4">
          <div
            className="relative flex w-full flex-col gap-3 overflow-hidden rounded-3xl border-t-2 border-t-[#5A3B6B] bg-[#0E161F] p-3"
            style={{ minHeight: 180 }}
          >
            <Image
              src="/img/glare-purple.png"
              alt="glare purple background"
              fill
              sizes=""
              style={{ objectFit: "cover", zIndex: 0 }}
              className="pointer-events-none rounded-3xl select-none"
            />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <Image
                  src="/img/cash-games.png"
                  alt="something"
                  height={50}
                  width={50}
                />
                <p className="mt-3 w-1/2 text-2xl font-bold">CASH GAMES</p>
              </div>
              <Link href={"/cash-games"}>
                <Button
                  size={"lg"}
                  variant={"secondary"}
                  className="w-20 rounded-lg"
                >
                  <Image
                    src="/icons/right-arrow.png"
                    alt="right arrow"
                    height={30}
                    width={30}
                  />
                </Button>
              </Link>
            </div>
          </div>
          <div
            className="relative flex w-full flex-col gap-3 overflow-hidden rounded-3xl border-t-2 border-t-[#4a625f] bg-[#0E161F] p-3"
            style={{ minHeight: 180 }}
          >
            <Image
              src="/img/glare-green.png"
              alt="glare green background"
              fill
              style={{ objectFit: "cover", zIndex: 0 }}
              className="pointer-events-none rounded-3xl select-none"
            />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <Image
                  src="/img/practice-games.png"
                  alt="something"
                  height={50}
                  width={50}
                />
                <p className="mt-3 w-1/2 text-2xl font-bold">PRACTICE GAMES</p>
              </div>
              <Link href={"/practice-games"}>
                <Button size={"lg"} className="w-20 rounded-lg">
                  <Image
                    src="/icons/right-arrow.png"
                    alt="right arrow"
                    height={25}
                    width={25}
                  />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default HomePage;
