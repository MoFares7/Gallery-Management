import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/AppProviders";
import { Suspense } from "react";
import Navbar from "@/components/navbar/Navbar";
import HandleStatusSection from "@/components/handles/HandleStateSection";
import NavigationLoader from "@/components/handles/NavigationLoader";
import { material } from "./../lib/material";

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
    icon: "/icons/logo.svg",
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
          <NavigationLoader />
          <Suspense fallback={<HandleStatusSection type="loading" />}>
            <Navbar />
            <material.Box
              sx={{
                minHeight: "100vh",
                backgroundColor: "background.default",
                background: "background.gradient",
              }}
            >
              <material.Container
                maxWidth="xl"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  pt: { xs: 4, md: 8, lg: 16 },
                }}
              >
                {children}
              </material.Container>
            </material.Box>
          </Suspense>
        </AppProviders>
      </body>
    </html>
  );
}
