import { useGetImageByID } from "@/services/image.service";
import { useParams, useRouter } from "next/navigation";

export const useGalleryDetails = () => {
  const params = useParams();
  const router = useRouter();
  const imageId = Number(params.id);
  const { data: image, isLoading, error } = useGetImageByID(imageId);

  const handleBack = () => {
    router.back();
  };

  return {
    image,
    isLoading,
    error,
    handleBack,
  };
};
