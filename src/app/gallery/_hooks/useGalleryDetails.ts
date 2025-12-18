import { useGetImageByID } from "@/services/image.service";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export const useGalleryDetails = () => {
  const params = useParams();
  const router = useRouter();
  const imageId = Number(params.id);
  const { data: image, isLoading, error } = useGetImageByID(imageId);
  const [showAnnotation, setShowAnnotation] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const toggleAnnotation = () => {
    setShowAnnotation((prev) => !prev);
  };

  return {
    image,
    isLoading,
    error,
    showAnnotation,
    handleBack,
    toggleAnnotation,
  };
};
