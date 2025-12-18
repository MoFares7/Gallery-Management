import { useGetCategoryByID } from "@/services/category.service";
import { useGetImages } from "@/services/image.service";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export const useCategoriesDetails = () => {
  const params = useParams();
  const router = useRouter();
  const categoryId = Number(params.id);
  const { data: category, isLoading, error } = useGetCategoryByID(categoryId);
  const { data: allImages } = useGetImages();

  const categoryImages = useMemo(() => {
    if (!allImages || !category) return [];
    return allImages.filter((img) => img.categoryId === category.id);
  }, [allImages, category]);

  const handleBack = () => {
    router.back();
  };

  return {
    category,
    isLoading,
    error,
    categoryImages,
    handleBack,
  };
};
