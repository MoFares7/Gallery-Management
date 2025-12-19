import { useNavigation } from "@/hooks/useNavigation";
import { useGetImageByID } from "@/services/image.service";
import { useParams } from "next/navigation";

export const useGalleryDetails = () => {
  const params = useParams();
  const { back } = useNavigation();
  const imageId = Number(params.id);
  const { data: image, isLoading, error } = useGetImageByID(imageId);

  const handleBack = () => {
    back();
  };

  return {
    image,
    isLoading,
    error,
    handleBack,
  };
};
