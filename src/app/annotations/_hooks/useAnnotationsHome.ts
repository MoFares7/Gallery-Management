import {
  useAnnotations,
  useCreateAnnotation,
  useDeleteAnnotation,
  useUpdateAnnotation,
} from "@/services/annotation.service";
import {
  Annotation,
  CreateAnnotationDto,
  UpdateAnnotationDto,
} from "@/types/annotation";
import { Image } from "@/types/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAnnotationsHome = () => {
  const router = useRouter();
  const { data: annotations, isLoading, error } = useAnnotations();
  const createMutation = useCreateAnnotation();
  const updateMutation = useUpdateAnnotation();
  const deleteMutation = useDeleteAnnotation();

  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<
    Annotation | undefined
  >();
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const handleCreate = () => {
    setSelectedAnnotation(undefined);
    setSelectedImage(null);
  };

  const handleEdit = (annotation: Annotation) => {
    setSelectedAnnotation(annotation);
    setFormOpen(true);
  };

  const handleDelete = (annotation: Annotation) => {
    setSelectedAnnotation(annotation);
    setDeleteDialogOpen(true);
  };

  const handleView = (annotation: Annotation) => {
    router.push(`/gallery/${annotation.imageId}`);
  };

  const handleFormSubmit = (
    data: CreateAnnotationDto | UpdateAnnotationDto
  ) => {
    if (selectedAnnotation) {
      updateMutation.mutate(
        { id: selectedAnnotation.id, data: data as UpdateAnnotationDto },
        {
          onSuccess: () => {
            setFormOpen(false);
            setSelectedAnnotation(undefined);
          },
        }
      );
    } else {
      createMutation.mutate(data as CreateAnnotationDto, {
        onSuccess: () => {
          setFormOpen(false);
        },
      });
    }
  };

  const handleConfirmDelete = () => {
    if (selectedAnnotation) {
      deleteMutation.mutate(selectedAnnotation.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedAnnotation(undefined);
        },
      });
    }
  };

  return {
    annotations,
    isLoading,
    error,
    formOpen,
    setFormOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedAnnotation,
    setSelectedAnnotation,
    selectedImage,
    setSelectedImage,
    handleCreate,
    handleEdit,
    handleDelete,
    handleView,
    handleFormSubmit,
    handleConfirmDelete,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
