import { useNavigation } from "@/hooks/useNavigation";
import {
  useCreateImage,
  useDeleteImage,
  useGetImages,
  useUpdateImage,
} from "@/services/image.service";
import { Image, ImageFilters } from "@/types/image";
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
  const { push } = useNavigation();
  const { data: images, isLoading, error } = useGetImages();
  const createMutation = useCreateImage();
  const updateMutation = useUpdateImage();
  const deleteMutation = useDeleteImage();

  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | undefined>();
  const [filters, setFilters] = useState<ImageFilters>({});
  const [filtersOpen, setFiltersOpen] = useState(false);

  const parseSizeToBytes = (sizeStr: string): number => {
    const match = sizeStr.match(/^(\d+(?:\.\d+)?)\s*(KB|MB|GB)?$/i);
    if (!match) return 0;
    const value = parseFloat(match[1]);
    const unit = match[2]?.toUpperCase() || "B";
    switch (unit) {
      case "KB":
        return value * 1024;
      case "MB":
        return value * 1024 * 1024;
      case "GB":
        return value * 1024 * 1024 * 1024;
      default:
        return value;
    }
  };

  const parseResolution = (
    resolutionStr: string
  ): { width: number; height: number } | null => {
    const match = resolutionStr.match(/^(\d+)\s*x\s*(\d+)$/i);
    if (!match) return null;
    return {
      width: parseInt(match[1], 10),
      height: parseInt(match[2], 10),
    };
  };

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

      if (filters.metadata?.size && image.metadata?.size !== undefined) {
        const filterSizeStr = filters.metadata.size;
        const imageSize = image.metadata.size;

        if (typeof imageSize === "string") {
          const filterSizeBytes = parseSizeToBytes(filterSizeStr);
          const imageSizeBytes = parseSizeToBytes(imageSize);

          if (filterSizeBytes === 0 && imageSizeBytes === 0) {
            if (
              !String(imageSize)
                .toLowerCase()
                .includes(String(filterSizeStr).toLowerCase())
            ) {
              return false;
            }
          } else if (imageSizeBytes < filterSizeBytes) {
            return false;
          }
        } else if (typeof imageSize === "number") {
          const filterSizeBytes = parseSizeToBytes(filterSizeStr);
          if (filterSizeBytes > 0 && imageSize < filterSizeBytes) {
            return false;
          }
        }
      }

      if (filters.metadata?.resolution && image.metadata?.resolution) {
        const filterRes = parseResolution(filters.metadata.resolution);
        const imageRes = parseResolution(String(image.metadata.resolution));

        if (filterRes && imageRes) {
          if (
            imageRes.width < filterRes.width ||
            imageRes.height < filterRes.height
          ) {
            return false;
          }
        } else {
          const imageResStr = String(image.metadata.resolution).toLowerCase();
          const filterResStr = filters.metadata.resolution.toLowerCase();
          if (!imageResStr.includes(filterResStr)) {
            return false;
          }
        }
      }

      return true;
    });
  }, [images, filters]);

  const handleDelete = (image: Image) => {
    setSelectedImage(image);
    setDeleteDialogOpen(true);
  };

  const handleView = (image: Image) => {
    push(`/gallery/${image.id}`);
  };

  const handleEdit = (image: Image) => {
    setSelectedImage(image);
    setUploadOpen(true);
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
    if (selectedImage) {
      updateMutation.mutate(
        {
          id: selectedImage.id,
          data: {
            name: data.name,
            categoryId: data.categoryId,
            metadata: data.metadata,
          },
        },
        {
          onSuccess: () => {
            setUploadOpen(false);
            setSelectedImage(undefined);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setUploadOpen(false);
        },
      });
    }
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
    filtersOpen,
    setFiltersOpen,
    filteredImages,
    isLoading,
    error,
    handleDelete,
    handleView,
    handleEdit,
    handleConfirmDelete,
    handleUploadSubmit,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
