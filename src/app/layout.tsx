import type { Metadata } from "next";
import "./globals.css";
import BackgroundGradient from "@/components/custom_components/BackgroundGradient";
import HomeLayout from "@/components/custom_components/HomeLayout";

const AppName = process.env.NEXT_PUBLIC_APP_NAME;

export const metadata: Metadata = {
  title: AppName,
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`html { scroll-behavior: smooth; }`}</style>
      </head>
      <body className={`font-calibre bg-[#050A0E]`}>
        <BackgroundGradient />
        <HomeLayout>{children}</HomeLayout>
      </body>
    </html>
  );
}
