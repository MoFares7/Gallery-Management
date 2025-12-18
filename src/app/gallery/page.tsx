import HomeGallery from "./_components/home/HomeGallery";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Gallery of images",
};

export default function GalleryPage() {
  return <HomeGallery />;
}
