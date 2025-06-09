import KeyFeaturesBox from "@/components/custom_components/KeyFeaturesBox";
import TestimonialBox from "@/components/custom_components/TestimonialBox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="static z-10 flex h-full flex-col gap-20 overflow-visible min-[2000px]:px-80 min-[3200px]:px-120">
      {/* Gradient Backgrounds - absolutely positioned, behind all content including navbar */}
      <div className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute top-[-190px] left-[100px] size-70 rounded-full bg-[radial-gradient(circle,_#4CE7ED66_0%,_#050A0E_100%)] blur-2xl md:top-[-230px] md:left-[-130px] md:size-90"></div>
        <div className="absolute top-[-150px] left-[-130px] size-80 rounded-full bg-[radial-gradient(circle,_#4CE7ED66_0%,_#050A0E_100%)] blur-2xl md:top-[-380px] md:left-[130px] md:size-110"></div>
        <div className="absolute top-[150px] right-[-200px] size-120 rounded-full bg-[radial-gradient(circle,_#AB39E84D_0%,_#050A0E_100%)] blur-2xl md:top-[300px] md:size-110"></div>
        <div className="absolute top-[150px] right-[-200px] size-120 rounded-full bg-[radial-gradient(circle,_#AB39E84D_0%,_#050A0E_100%)] blur-2xl md:top-[1300px] md:size-110"></div>
      </div>

      <section className="grid min-h-screen grid-cols-1 gap-8 px-4 py-10 md:grid-cols-12 md:px-10 md:py-20 lg:gap-20 lg:px-20">
        <div className="order-2 flex flex-col justify-center gap-8 max-lg:items-center max-md:text-center md:order-1 md:col-span-7">
          <div>
            <p className="text-4xl leading-tight font-bold text-white sm:text-5xl md:text-7xl">
              Play. Win. Repeat. The <br className="hidden lg:block" />
              Ultimate Quiz Game
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-500 sm:text-2xl md:text-3xl">
              Challenge your friends, climb the leaderboards, and win exciting
              real rewards. Join the fun and test your knowledge today!
            </p>
          </div>
          <div className="flex w-full max-w-xs flex-col items-center gap-4 max-md:justify-center sm:max-w-none sm:flex-row sm:gap-5">
            <Button size={"lg"} className="w-full sm:w-auto">
              Download Now
            </Button>
            <Button
              size={"lg"}
              variant={"outline"}
              className="w-full sm:w-auto"
            >
              Play in Browser
            </Button>
          </div>
          <div className="mt-4 flex w-full items-center justify-between max-md:justify-evenly md:w-60">
            <div className="flex -space-x-2">
              <Avatar>
                <AvatarImage
                  src={`/img/avatar_img1.jpg`}
                  className="h-full w-full object-cover"
                />
                <AvatarFallback>img</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src={`/img/avatar_img2.jpg`}
                  className="h-full w-full object-cover"
                />
                <AvatarFallback>img</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src={`/img/avatar_img3.jpg`}
                  className="h-full w-full object-cover"
                />
                <AvatarFallback>img</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src={`/img/avatar_img4.jpg`}
                  className="h-full w-full object-cover"
                />
                <AvatarFallback>img</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-xs sm:text-sm">
              <p className="text-white">10k+ active players</p>
              <p>⭐⭐⭐⭐⭐</p>
            </div>
          </div>
        </div>
        <div className="order-1 mb-8 min-h-[200px] rounded-xl bg-gray-700 md:order-2 md:col-span-5 md:mb-0"></div>
      </section>

      <section className="flex min-h-screen flex-col items-center justify-center gap-6 p-4 text-white md:p-10">
        <div className="inline-block rounded-full bg-gradient-to-r from-purple-700 via-blue-600 to-cyan-400 p-[1px]">
          <div className="w-full rounded-full bg-gray-900 px-3 py-2 text-sm md:text-base">
            Key Features
          </div>
        </div>
        <p className="text-center text-3xl font-bold sm:text-4xl md:text-5xl">
          Why You&apos;ll Love KBC Quiz
        </p>
        <div>
          <p className="text-center text-base text-gray-400 md:text-lg">
            KBC Quiz offers an exhilarating experience with various game modes
            and <br className="hidden md:block" />
            real cash rewards. Dive into a world of knowledge and competition!
          </p>
        </div>
        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 font-sans md:grid-cols-3">
          <KeyFeaturesBox
            imgPath="award.png"
            mainContent="Multiple Game Modes"
            secondaryContent="Play solo, challenge the AI, or go head-to-head with real players in various exciting quiz formats"
          />
          <KeyFeaturesBox
            imgPath="dollarsign.png"
            mainContent="Win Real Cash"
            secondaryContent="Enter cash games and earn money based on your quiz skills. The smarter you are, the more you earn!"
          />
          <KeyFeaturesBox
            imgPath="book.png"
            mainContent="Diverse Topics"
            secondaryContent="From history and politics to sports and cinema - there's a quiz category for everyone's expertise."
          />
        </div>
      </section>

      <section className="grid min-h-screen grid-cols-1 gap-8 px-4 py-10 md:grid-cols-12 md:px-10 md:py-20 lg:gap-20 lg:px-20">
        <div className="mb-8 min-h-[200px] rounded-xl bg-gray-700 md:col-span-5 md:mb-0"></div>
        <div className="flex flex-col justify-center p-2 md:col-span-7 md:p-4">
          <div>
            <div className="inline-block rounded-md bg-gradient-to-r from-purple-700 via-blue-600 to-cyan-400 p-[1px]">
              <Image
                src="/icons/users.png"
                alt="users"
                width={70}
                height={60}
                className="rounded-md bg-gray-800 px-5 py-2"
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-5xl text-white">
              Battle Friends or Join <br className="hidden lg:block" />
              Group Tournaments
            </p>
          </div>
          <div className="mt-4">
            <p className="text-gray-400">
              Choose between intense 1v1s or big group matches. It&apos;s more
              fun when you challenge others - and the rewards get bigger too!
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-4 text-gray-400">
            <div className="flex items-center">
              <Image
                src="/icons/check.png"
                className="mr-3 rounded-full bg-purple-500 p-2"
                alt=""
                width={25}
                height={20}
              />
              <p>Join tournaments with upto 100 players</p>
            </div>
            <div className="flex items-center">
              <Image
                src="/icons/check.png"
                className="mr-3 rounded-full bg-purple-500 p-2"
                alt=""
                width={25}
                height={20}
              />
              <p>Invite friends to private matches</p>
            </div>
            <div className="flex items-center">
              <Image
                src="/icons/check.png"
                className="mr-3 rounded-full bg-purple-500 p-2"
                alt=""
                width={25}
                height={20}
              />
              <p>Form teams and compete in group challenges</p>
            </div>
            <div className="flex items-center">
              <Image
                src="/icons/check.png"
                className="mr-3 rounded-full bg-purple-500 p-2"
                alt=""
                width={25}
                height={20}
              />
              <p>Win bigger prizes in multiplayer modes</p>
            </div>
          </div>
          <div className="mt-8">
            <Button size={"lg"}>Create a Tournament</Button>
          </div>
        </div>
      </section>
      <section className="grid min-h-screen w-full grid-cols-1 gap-8 px-4 py-10 md:grid-cols-12 md:px-10 md:py-20 lg:gap-20 lg:px-20">
        <div className="flex flex-col justify-center md:order-1 md:col-span-7 md:p-4">
          <div>
            <div className="inline-block rounded-md bg-gradient-to-r from-purple-700 via-blue-600 to-cyan-400 p-[1px]">
              <Image
                src="/icons/dollarsign.png"
                alt="users"
                width={70}
                height={60}
                className="rounded-md bg-gray-800 px-5 py-2"
              />
            </div>
          </div>
          <p className="mt-4 text-5xl font-bold text-white">
            Earn More with Welcome Bonuses
          </p>
          <p className="mt-4 text-gray-400">
            Get up to ₹500 bonus when you add money for the first time. More
            bonuses unlocked as you play!
          </p>

          <div className="border-background/5 mt-4 rounded-md border-2 bg-[#111827]/80 p-4">
            <p className="text-3xl text-white">Available Bonuses:</p>
            <div className="mt-4 flex flex-col gap-4 text-gray-400">
              <div className="flex items-center">
                <Image
                  src="/icons/check.png"
                  className="mr-3 rounded-full bg-purple-500 p-2"
                  alt=""
                  width={25}
                  height={20}
                />
                <p>100% cashback up to ₹500 on first deposit</p>
              </div>
              <div className="flex items-center">
                <Image
                  src="/icons/check.png"
                  className="mr-3 rounded-full bg-purple-500 p-2"
                  alt=""
                  width={25}
                  height={20}
                />
                <p>Daily login bonus - collect streak rewards</p>
              </div>
              <div className="flex items-center">
                <Image
                  src="/icons/check.png"
                  className="mr-3 rounded-full bg-purple-500 p-2"
                  alt=""
                  width={25}
                  height={20}
                />
                <p>Refer a friend and get ₹100 for each signup</p>
              </div>
              <div className="flex items-center">
                <Image
                  src="/icons/check.png"
                  className="mr-3 rounded-full bg-purple-500 p-2"
                  alt=""
                  width={25}
                  height={20}
                />
                <p>Weekend special - 50% bonus on all deposits</p>
              </div>
            </div>
          </div>

          <div>
            <Button size={"lg"} className="mt-5">
              Add Money Now
            </Button>
          </div>
        </div>
        <div className="mb-8 min-h-[200px] rounded-xl bg-gray-700 md:order-2 md:col-span-5 md:mb-0"></div>
      </section>

      <section className="grid min-h-screen grid-cols-1 gap-8 px-4 py-10 md:grid-cols-12 md:px-10 md:py-20 lg:px-20">
        <div className="mb-8 min-h-[200px] rounded-xl bg-gray-700 md:col-span-5 md:mb-0"></div>
        <div className="flex flex-col justify-center p-2 text-gray-400 md:col-span-7 md:p-4">
          <div>
            <div className="inline-block rounded-md bg-gradient-to-r from-purple-700 via-blue-600 to-cyan-400 p-[1px]">
              <Image
                src="/icons/award.png"
                alt="users"
                width={70}
                height={60}
                className="rounded-md bg-gray-800 px-5 py-2"
              />
            </div>
          </div>
          <p className="mt-4 text-5xl text-white">
            Climb the Ranks & Get Featured
          </p>
          <p className="mt-4">
            Top 10 players each week win big prizes! Check your position anytime
            with our <br />
            real-time leaderboard.
          </p>
          <div className="bg-background/4 mt-4 flex flex-col gap-3 rounded-md border-1 border-gray-800 p-4">
            <p className="font-bold text-white">🥇 1st Place</p>
            <p>₹10,000 + Premium Badge + 1 Month VIP Access</p>
          </div>
          <div className="bg-background/4 mt-4 flex flex-col gap-3 rounded-md border-1 border-gray-800 p-4">
            <p className="font-bold text-white">🥈 2nd - 5th Place</p>
            <p>₹5,000 + Gold Badge + 2 Weeks VIP Access</p>
          </div>
          <div className="bg-background/4 mt-4 flex flex-col gap-3 rounded-md border-1 border-gray-800 p-4">
            <p className="font-bold text-white">🥉 6th - 10th Place</p>
            <p>₹2,000 + Silver Badge + 1 Week VIP Access</p>
          </div>
          <div>
            <Button size={"lg"} className="mt-4">
              Play & Rank Up Now
            </Button>
          </div>
        </div>
      </section>

      <section className="flex min-h-[60vh] flex-col items-center gap-6 p-5 text-white md:p-10">
        <div className="inline-block rounded-full bg-gradient-to-r from-purple-700 via-blue-600 to-cyan-400 p-[1px]">
          <div className="w-full rounded-full bg-gray-900 px-3 py-2 text-sm md:text-base">
            Testimonial
          </div>
        </div>
        <p className="text-center text-3xl font-bold sm:text-4xl md:text-5xl">
          What our Users are saying
        </p>
        <div>
          <p className="text-center text-base text-gray-400 md:text-lg">
            Join thousands of happy players and start winning today!
          </p>
        </div>
        <div className="w-full max-w-6xl px-10">
          <Carousel
            opts={{
              loop: true,
              align: "start",
            }}
          >
            <CarouselContent>
              <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
                <TestimonialBox
                  imgUrl="avatar_img2.jpg"
                  testimonial="This app is addictive! I made 2000 in just a while learning new things!"
                  name="Priya S"
                  place="Mumbai"
                />
              </CarouselItem>
              <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
                <TestimonialBox
                  imgUrl="avatar_img1.jpg"
                  testimonial="Smooth gameplay and no ads! I love the daily quizzes."
                  name="Rahul M"
                  place="Bengaluru"
                />
              </CarouselItem>
              <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3">
                <TestimonialBox
                  imgUrl="avatar_img3.jpg"
                  testimonial="Finally an app where my trivia knowledge pays off!"
                  name="Anoop K"
                  place="Delhi"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <Button size={"lg"} className="w-full sm:w-auto">
          Start Playing Now
        </Button>
      </section>

      <section className="grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-12 md:px-10 md:py-20 lg:px-20">
        <div className="flex flex-col items-start p-2 md:col-span-5 md:p-5">
          <p className="mb-5 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            FAQs
          </p>
          <p className="mb-5 text-base text-gray-400 sm:text-lg">
            Find answers to your questions about gameplay, rewards,{" "}
            <br className="hidden md:block" />
            and app security.
          </p>
          <Button size={"lg"} className="w-full sm:w-auto">
            Contact Us
          </Button>
        </div>
        <div className="md:col-span-7">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Can I win real money?</AccordionTrigger>
              <AccordionContent>
                Yes! Join any cash game to comptete for real rewards. Your
                knowledge can earn you <br />
                money while you enjoy the game. Take the challenge andsee how
                much you can win!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it free to play?</AccordionTrigger>
              <AccordionContent>Yes. It is free to play.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is the wallet secure?</AccordionTrigger>
              <AccordionContent>
                The wallet is secure. No need to worry about it.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What topics are covered?</AccordionTrigger>
              <AccordionContent>
                Everything you think and not think of.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Need more help?</AccordionTrigger>
              <AccordionContent>
                If you any help, contact us from the email given below.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
