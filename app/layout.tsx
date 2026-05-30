import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import About from "@/components/main/about";
import Navigation from "@/components/nav";
import Header from "@/components/Header";
import LightRays from "@/components/lightRays";
import SwipeNavigator from "@/components/SwipeNavigatorAnimated";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Akshat Thapliyal | Portfolio",
    template: "%s | Akshat Thapliyal",
  },
  description:
    "Full-stack developer passionate about building impactful solutions with Next.js, TypeScript, React, and modern web technologies. Explore projects, skills, and get in touch.",
  keywords: [
    "Akshat Thapliyal",
    "portfolio",
    "full-stack developer",
    "Next.js",
    "React",
    "TypeScript",
    "web developer",
    "frontend developer",
    "backend developer",
  ],
  authors: [{ name: "Akshat Thapliyal" }],
  openGraph: {
    title: "Akshat Thapliyal | Portfolio",
    description:
      "Full-stack developer passionate about building impactful solutions with Next.js, TypeScript, React, and modern web technologies.",
    url: "https://akshat-thapliyal.vercel.app",
    siteName: "Akshat Thapliyal Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://akshat-thapliyal.vercel.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Akshat Thapliyal",
  url: "https://akshat-thapliyal.vercel.app",
  jobTitle: "Full-Stack Developer",
  knowsAbout: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#121212]`}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />

        <Navigation />

        {/* Swipe navigation across main routes (mobile/tablet). Order determines next/previous. */}
        <SwipeNavigator
          routes={["/", "/projects", "/game", "/socials"]}
          enabled={true}
        />

        <div className="min-h-screen w-screen flex flex-col items-center justify-between overflow-x-hidden pt-16 md:pt-20 pb-20 md:pb-24 relative z-10">
          <Header />
          <div className="flex-1 flex items-center justify-center w-full max-w-screen-xl mx-auto px-4 md:px-0">
            {children}
          </div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
