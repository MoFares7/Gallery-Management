"use client";

import { Box, Container } from "@mui/material";
import CategoriesSection from "./_components/categories-section/CategoriesSection";
import GallarySection from "./_components/gallary-section/GallarySection";
import Hero from "./_components/hero/Hero";

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        background: "linear-gradient(to bottom, #ffffff 0%, #f5f7fa 100%)",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ display: "flex", flexDirection: "column", gap: 4, pt: 16, pb: 8 }}
      >
        <Hero />
        <CategoriesSection />
        <GallarySection />
      </Container>
    </Box>
  );
}
