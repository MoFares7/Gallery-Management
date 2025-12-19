import { useNavigation } from "@/hooks/useNavigation";
import {
  useAnnotations,
  useDeleteAnnotation,
} from "@/services/annotation.service";
import { useGetImages } from "@/services/image.service";
import { Annotation } from "@/types/annotation";
import { Image } from "@/types/image";
import { useMemo, useState } from "react";

export const useAnnotationsHome = () => {
  const { push } = useNavigation();
  const { data: images } = useGetImages();
  const { data: annotations, isLoading, error } = useAnnotations();
  const deleteMutation = useDeleteAnnotation();

  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState<
    Annotation | undefined
  >();
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [imageSelectOpen, setImageSelectOpen] = useState(false);
  const [tempSelectedImage, setTempSelectedImage] = useState<Image | null>(
    null
  );

  const handleEdit = (annotation: Annotation) => {
    setSelectedAnnotation(annotation);
    setFormOpen(true);
  };

  const handleDelete = (annotation: Annotation) => {
    setSelectedAnnotation(annotation);
    setDeleteDialogOpen(true);
  };

  const handleView = (annotation: Annotation) => {
    push(`/gallery/${annotation.imageId}`);
  };

  const annotationsByImage = useMemo(() => {
    if (!annotations) return new Map();
    const map = new Map<number, typeof annotations>();
    annotations.forEach((annotation) => {
      if (!map.has(annotation.imageId)) {
        map.set(annotation.imageId, []);
      }
      map.get(annotation.imageId)!.push(annotation);
    });
    return map;
  }, [annotations]);

  const imageMap = useMemo(() => {
    if (!images) return new Map();
    return new Map(images.map((img) => [img.id, img]));
  }, [images]);

  const annotationsWithImages = useMemo(() => {
    if (!annotations || !images) return [];

    return Array.from(annotationsByImage.entries())
      .map(([imageId, imageAnnotations]) => {
        const image = imageMap?.get(imageId);
        if (!image) return null;
        return {
          image,
          annotation: imageAnnotations[0],
        };
      })
      .filter(
        (item): item is { image: Image; annotation: Annotation } =>
          item !== null
      );
  }, [annotationsByImage, imageMap, annotations, images]);

  const imageForEdit = useMemo(() => {
    if (selectedAnnotation) {
      return imageMap.get(selectedAnnotation.imageId);
    }
    return null;
  }, [selectedAnnotation, imageMap]);

  const handleCreateClick = () => {
    setTempSelectedImage(null);
    setImageSelectOpen(true);
  };

  const handleImageSelectConfirm = () => {
    if (tempSelectedImage) {
      setSelectedImage(tempSelectedImage);
      setImageSelectOpen(false);
      setFormOpen(true);
    }
  };

  const handleImageSelect = (image: Image) => {
    setTempSelectedImage(image);
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
    handleEdit,
    handleDelete,
    handleView,
    handleConfirmDelete,
    deleteMutation,
    imageSelectOpen,
    setImageSelectOpen,
    tempSelectedImage,
    setTempSelectedImage,
    handleCreateClick,
    handleImageSelectConfirm,
    handleImageSelect,
    annotationsWithImages,
    imageForEdit,
    images,
  };
};
