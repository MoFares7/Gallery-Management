import CategoriesSection from "@/app/(home)/_components/categories-section/CategoriesSection";
import GallerySection from "@/app/(home)/_components/gallery-section/GallerySection";
import Hero from "@/app/(home)/_components/hero/Hero";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home",
  description: "Home page",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <GallerySection />
    </>
  );
}
