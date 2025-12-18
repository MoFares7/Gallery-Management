import HomeAnnotations from "./_components/home/HomeAnnotations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Annotations",
  description: "Annotations",
};

export default function AnnotationsPage() {
  return <HomeAnnotations />;
}
