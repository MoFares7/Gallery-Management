import HomeCategories from "./_components/home/HomeCategories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Categories",
};

export default function CategoriesPage() {
  return <HomeCategories />;
}
