"use client";

import { material } from "@/lib/material";
import CategoriesSection from "./home/_components/categories-section/CategoriesSection";
import Hero from "./home/_components/hero/Hero";
import GallerySection from "./home/_components/gallery-section/GallerySection";

export default function HomePage() {
  return (
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
        <Hero />
        <CategoriesSection />
        <GallerySection />
      </material.Container>
    </material.Box>
  );
}
