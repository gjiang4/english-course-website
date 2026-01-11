import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Social & Lifestyle English - Master Everyday Conversations",
  description: "Master everyday English for greetings, small talk, travel, and social dynamics. Build real confidence for real-world situations with our comprehensive video course.",
  keywords: ["English course", "social English", "conversation skills", "small talk", "travel English", "ESL"],
  authors: [{ name: "Social & Lifestyle English" }],
  openGraph: {
    title: "Social & Lifestyle English - Master Everyday Conversations",
    description: "Master everyday English for greetings, small talk, travel, and social dynamics. Build real confidence for real-world situations.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social & Lifestyle English",
    description: "Master everyday English for greetings, small talk, travel, and social dynamics.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
