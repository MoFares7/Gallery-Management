import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Image, CreateImageDto, UpdateImageDto } from "@/types/image";
import {
  getAllImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
} from "../endpoints/image";

const IMAGES_QUERY_KEY = "images";

export const useGetImages = () => {
  return useQuery({
    queryKey: [IMAGES_QUERY_KEY],
    queryFn: () => getAllImages({}),
  });
};

export const useGetImageByID = (id: number) => {
  return useQuery({
    queryKey: [IMAGES_QUERY_KEY, id],
    queryFn: () => getImageById(id, {}),
    enabled: !!id,
  });
};

export const useCreateImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateImageDto) => createImage(data, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [IMAGES_QUERY_KEY] });
      toast.success("Image uploaded successfully");
    },
    onError: () => {
      toast.error("Failed to upload image");
    },
  });
};

export const useUpdateImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateImageDto }) =>
      updateImage(id, data, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [IMAGES_QUERY_KEY] });
      toast.success("Image updated successfully");
    },
    onError: () => {
      toast.error("Failed to update image");
    },
  });
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteImage(id, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [IMAGES_QUERY_KEY] });
      toast.success("Image deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete image");
    },
  });
};
