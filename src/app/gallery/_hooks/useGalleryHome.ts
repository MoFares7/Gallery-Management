import {
  useCreateImage,
  useDeleteImage,
  useGetImages,
} from "@/services/image.service";
import { Image, ImageFilters } from "@/types/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type CreateImageData = {
  name: string;
  url: string;
  categoryId?: number;
  metadata?: {
    size?: number;
    width?: number;
    height?: number;
    format?: string;
  };
};

export const useGalleryHome = () => {
  const router = useRouter();
  const { data: images, isLoading, error } = useGetImages();
  const createMutation = useCreateImage();
  const deleteMutation = useDeleteImage();

  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | undefined>();
  const [filters, setFilters] = useState<ImageFilters>({});

  const filteredImages = useMemo(() => {
    if (!images) return [];

    return images.filter((image) => {
      if (
        filters.name &&
        !image.name.toLowerCase().includes(filters.name.toLowerCase())
      ) {
        return false;
      }

      if (filters.categoryId && image.categoryId !== filters.categoryId) {
        return false;
      }

      if (filters.minWidth && (image.metadata?.width || 0) < filters.minWidth) {
        return false;
      }

      if (
        filters.minHeight &&
        (image.metadata?.height || 0) < filters.minHeight
      ) {
        return false;
      }

      return true;
    });
  }, [images, filters]);

  const handleDelete = (image: Image) => {
    setSelectedImage(image);
    setDeleteDialogOpen(true);
  };

  const handleView = (image: Image) => {
    router.push(`/gallery/${image.id}`);
  };

  const handleConfirmDelete = () => {
    if (selectedImage) {
      deleteMutation.mutate(selectedImage.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedImage(undefined);
        },
      });
    }
  };

  const handleUploadSubmit = (data: CreateImageData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setUploadOpen(false);
      },
    });
  };

  return {
    uploadOpen,
    setUploadOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedImage,
    setSelectedImage,
    filters,
    setFilters,
    filteredImages,
    isLoading,
    error,
    handleDelete,
    handleView,
    handleConfirmDelete,
    handleUploadSubmit,
    createMutation,
    deleteMutation,
  };
};
