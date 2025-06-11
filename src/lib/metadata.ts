// lib/metadata.ts
import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: {
    default: "Kbc Quiz",
    template: "%s | Kbc Quiz",
  },
  description: "Your app description",
  keywords: ["keyword1", "keyword2"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yoursite.com",
    siteName: "Your App Name",
  },
};

// Route-specific metadata
export const routeMetadata = {
  "/": {
    title: "KBC Quiz",
    description: "Home page description",
  },
  "/home": {
    title: "Home | KBC Quiz",
    description: "Dashboard page description",
  },
  "/leaderboard": {
    title: "Leaderboard | KBC Quiz",
    description: "Leaderboard page description",
  },
} as const;

export function getMetadataForRoute(path: string): Metadata {
  const route = routeMetadata[path as keyof typeof routeMetadata];
  return {
    ...siteMetadata,
    title: route?.title || siteMetadata.title,
    description: route?.description || siteMetadata.description,
  };
}
