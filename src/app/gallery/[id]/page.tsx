import { Metadata } from "next";
import GalleryDetails from "../_components/details/GalleryDetails";

export const metadata: Metadata = {
  title: "Gallery Details",
  description: "Gallery Details",
};

export default function GalleryDetailsPage() {
  return <GalleryDetails />;
}
