import { Metadata } from "next";
import CategoriesDetails from "../_components/details/CategoriesDetails";

export const metadata: Metadata = {
  title: "Category Details",
  description: "Category Details",
};

export default function CategoryDetailPage() {
  return <CategoriesDetails />;
}
