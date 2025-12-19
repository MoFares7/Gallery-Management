import {
  useCreateAnnotation,
  useUpdateAnnotation,
} from "@/services/annotation.service";
import {
  Annotation,
  CreateAnnotationDto,
  UpdateAnnotationDto,
} from "@/types/annotation";
import { Image } from "@/types/image";
import { useState, useEffect, useRef, useMemo } from "react";

interface DrawingRect {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const COLORS = [
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
];

export const useAddEditAnnotation = (
  image: Image,
  annotationToEdit?: Annotation | null,
  onClose?: () => void,
  isModal?: boolean
) => {
  const [selectedColor, setSelectedColor] = useState(
    annotationToEdit?.color || COLORS[0]
  );
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isActivelyDrawing, setIsActivelyDrawing] = useState(false);
  const [currentRect, setCurrentRect] = useState<DrawingRect | null>(null);
  const [pendingRect, setPendingRect] = useState<DrawingRect | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [editingAnnotationId, setEditingAnnotationId] = useState<number | null>(
    annotationToEdit?.id || null
  );
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const [imageScale, setImageScale] = useState(1);
  const ContainerRef = useRef<HTMLDivElement>(null);

  const annotations = useMemo(() => {
    if (annotationToEdit) {
      return [annotationToEdit];
    }
    return [];
  }, [annotationToEdit]);

  const createAnnotation = useCreateAnnotation();
  const updateAnnotation = useUpdateAnnotation();

  const [konvaImage, setKonvaImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (annotationToEdit) {
      setSelectedColor(annotationToEdit.color);
      setEditingAnnotationId(annotationToEdit.id);
      setIsDrawingMode(false);
    } else {
      setEditingAnnotationId(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [annotationToEdit?.id]);

  useEffect(() => {
    setIsImageLoading(true);
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setKonvaImage(img);
      setIsImageLoading(false);
    };
    img.onerror = () => {
      setIsImageLoading(false);
    };
    img.src = image.url;
  }, [image.url]);

  useEffect(() => {
    if (!konvaImage) return;

    const updateSize = () => {
      if (ContainerRef.current) {
        const ContainerWidth = ContainerRef.current.clientWidth;
        const maxWidth = Math.min(ContainerWidth, konvaImage.width);
        const scale = maxWidth / konvaImage.width;
        const height = konvaImage.height * scale;

        setStageSize({
          width: maxWidth,
          height: height,
        });
        setImageScale(scale);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [konvaImage]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePointerDown = (e: any) => {
    e.evt?.preventDefault?.();

    const stage = e.target.getStage();
    if (!stage) return;

    const targetType = e.target.getType?.();

    if (targetType === "Rect" && !isDrawingMode) {
      const clickedAnnotation = annotations.find(
        (ann: Annotation) =>
          ann.id === editingAnnotationId ||
          (ann.x * imageScale <= e.target.x() &&
            ann.y * imageScale <= e.target.y() &&
            (ann.x + ann.width) * imageScale >= e.target.x() &&
            (ann.y + ann.height) * imageScale >= e.target.y())
      );
      if (clickedAnnotation) {
        handleEditAnnotation(clickedAnnotation);
      }
      return;
    }

    if (!isDrawingMode) return;

    if (targetType === "Rect") {
      return;
    }

    const point = stage.getPointerPosition();
    if (point) {
      setIsActivelyDrawing(true);
      setCurrentRect({
        x: point.x,
        y: point.y,
        width: 0,
        height: 0,
        color: selectedColor,
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePointerMove = (e: any) => {
    if (!isActivelyDrawing || !currentRect) return;

    if (isDrawingMode) {
      e.evt?.preventDefault?.();
    }

    const stage = e.target.getStage();
    if (!stage) return;

    const point = stage.getPointerPosition();
    if (point) {
      setCurrentRect({
        ...currentRect,
        width: point.x - currentRect.x,
        height: point.y - currentRect.y,
      });
    }
  };

  const handlePointerUp = () => {
    if (!isActivelyDrawing || !currentRect) {
      setIsActivelyDrawing(false);
      setCurrentRect(null);
      return;
    }

    if (Math.abs(currentRect.width) > 5 && Math.abs(currentRect.height) > 5) {
      setPendingRect(currentRect);
      setIsActivelyDrawing(false);
      setCurrentRect(null);
      setIsDrawingMode(false);
    } else {
      setIsActivelyDrawing(false);
      setCurrentRect(null);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseDown = (e: any) => handlePointerDown(e);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseMove = (e: any) => handlePointerMove(e);
  const handleMouseUp = () => handlePointerUp();

  const handleSave = () => {
    if (!pendingRect || isSaving) return;

    const normalizedRect = {
      x:
        Math.min(pendingRect.x, pendingRect.x + pendingRect.width) / imageScale,
      y:
        Math.min(pendingRect.y, pendingRect.y + pendingRect.height) /
        imageScale,
      width: Math.abs(pendingRect.width) / imageScale,
      height: Math.abs(pendingRect.height) / imageScale,
    };

    if (editingAnnotationId) {
      const updateData: UpdateAnnotationDto = {
        x: normalizedRect.x,
        y: normalizedRect.y,
        width: normalizedRect.width,
        height: normalizedRect.height,
        color: pendingRect.color,
      };

      setIsSaving(true);

      updateAnnotation.mutate(
        { id: editingAnnotationId, data: updateData },
        {
          onSettled: () => {
            setIsSaving(false);
            setPendingRect(null);
            setEditingAnnotationId(null);
            if (onClose) onClose();
          },
        }
      );
    } else {
      const annotationData: CreateAnnotationDto = {
        imageId: image.id,
        type: "rectangle",
        x: normalizedRect.x,
        y: normalizedRect.y,
        width: normalizedRect.width,
        height: normalizedRect.height,
        color: pendingRect.color,
      };

      setIsSaving(true);

      createAnnotation.mutate(annotationData, {
        onSettled: () => {
          setIsSaving(false);
          setPendingRect(null);
          if (isModal && onClose) onClose();
        },
      });
    }
  };

  const handleCancel = () => {
    setPendingRect(null);
    setCurrentRect(null);
    setIsActivelyDrawing(false);
    setIsDrawingMode(false);
  };

  const handleEditAnnotation = (annotation: Annotation) => {
    setEditingAnnotationId(annotation.id);
    setSelectedColor(annotation.color);
    setIsDrawingMode(true);
    const x = annotation.x * imageScale;
    const y = annotation.y * imageScale;
    const width = annotation.width * imageScale;
    const height = annotation.height * imageScale;
    setCurrentRect({
      x,
      y,
      width,
      height,
      color: annotation.color,
    });
  };

  const renderAnnotation = (annotation: Annotation) => {
    const x = annotation.x * imageScale;
    const y = annotation.y * imageScale;
    const width = annotation.width * imageScale;
    const height = annotation.height * imageScale;
    const isEditing = editingAnnotationId === annotation.id;

    return {
      x,
      y,
      width,
      height,
      isEditing,
      annotation,
    };
  };

  return {
    COLORS,
    selectedColor,
    setSelectedColor,
    isDrawingMode,
    setIsDrawingMode,
    isActivelyDrawing,
    currentRect,
    pendingRect,
    isSaving,
    isImageLoading,
    editingAnnotationId,
    stageSize,
    ContainerRef,
    annotations,
    konvaImage,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleEditAnnotation,
    handleSave,
    handleCancel,
    renderAnnotation,
  };
};
