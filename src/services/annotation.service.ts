import { CreateAnnotationDto, UpdateAnnotationDto } from "@/types/annotation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createAnnotation,
  deleteAnnotation,
  getAllAnnotations,
  getAnnotationsByImageId,
  updateAnnotation,
} from "../endpoints/annotation";

const ANNOTATIONS_QUERY_KEY = "annotations";

export const useAnnotations = () => {
  return useQuery({
    queryKey: [ANNOTATIONS_QUERY_KEY],
    queryFn: () => getAllAnnotations({}),
  });
};

export const useAnnotationsByImageId = (imageId: number) => {
  return useQuery({
    queryKey: [ANNOTATIONS_QUERY_KEY, "image", imageId],
    queryFn: () => getAnnotationsByImageId(imageId, {}),
    enabled: !!imageId,
  });
};

export const useCreateAnnotation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAnnotationDto) => createAnnotation(data, {}),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [ANNOTATIONS_QUERY_KEY, "image", variables.imageId],
      });
      queryClient.invalidateQueries({ queryKey: [ANNOTATIONS_QUERY_KEY] });
      toast.success("Annotation created successfully");
    },
    onError: () => {
      toast.error("Failed to create annotation");
    },
  });
};

export const useUpdateAnnotation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateAnnotationDto }) =>
      updateAnnotation(id, data, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ANNOTATIONS_QUERY_KEY] });
      toast.success("Annotation updated successfully");
    },
    onError: () => {
      toast.error("Failed to update annotation");
    },
  });
};

export const useDeleteAnnotation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAnnotation(id, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ANNOTATIONS_QUERY_KEY] });
      toast.success("Annotation deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete annotation");
    },
  });
};
