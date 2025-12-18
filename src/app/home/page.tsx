"use client";

import { Box, Container } from "@mui/material";
import CategoriesSection from "./_components/categories-section/CategoriesSection";
import Hero from "./_components/hero/Hero";
import GallerySection from "./_components/gallery-section/GallerySection";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        background: "background.gradient",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ display: "flex", flexDirection: "column", gap: 4, pt: 16, pb: 8 }}
      >
        <Hero />
        <CategoriesSection />
        <GallerySection />
      </Container>
    </Box>
  );
}
