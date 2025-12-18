import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { Suspense } from "react";
import Navbar from "@/components/navbar/Navbar";
import HandleStatusSection from "@/components/handles/HandleStateSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Averroes",
  description: "Manage images, categories, and annotations",
  icons: {
    icon: "../../public/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppProviders>
          <Suspense fallback={<HandleStatusSection type="loading" />}>
            <Navbar />
            {children}
          </Suspense>
        </AppProviders>
      </body>
    </html>
  );
}
