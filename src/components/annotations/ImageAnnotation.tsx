"use client";

import {
  useAnnotationsByImageId,
  useCreateAnnotation,
  useDeleteAnnotation,
} from "@/services/annotation.service";
import { Annotation, CreateAnnotationDto } from "@/types/annotation";
import { Image } from "@/types/image";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import DeleteConfirmationDialog from "../modals/DeleteConfirmationDialog";

interface ImageAnnotationProps {
  image: Image;
}

interface DrawingRect {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const COLORS = [
  "#FF0000", // Red
  "#00FF00", // Green
  "#0000FF", // Blue
  "#FFFF00", // Yellow
  "#FF00FF", // Magenta
  "#00FFFF", // Cyan
  "#FFA500", // Orange
  "#800080", // Purple
];

export default function ImageAnnotation({ image }: ImageAnnotationProps) {
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isActivelyDrawing, setIsActivelyDrawing] = useState(false);
  const [currentRect, setCurrentRect] = useState<DrawingRect | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const [imageScale, setImageScale] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [annotationToDelete, setAnnotationToDelete] = useState<number | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: annotations = [], isLoading } = useAnnotationsByImageId(
    image.id
  );
  const createAnnotation = useCreateAnnotation();
  const deleteAnnotation = useDeleteAnnotation();

  const [konvaImage, setKonvaImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      setKonvaImage(img);
    };
    img.src = image.url;
  }, [image.url]);

  useEffect(() => {
    if (!konvaImage) return;

    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const maxWidth = Math.min(containerWidth, konvaImage.width);
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
  const handleMouseDown = (e: any) => {
    if (!isDrawingMode) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const targetType = e.target.getType?.();
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
  const handleMouseMove = (e: any) => {
    if (!isActivelyDrawing || !currentRect) return;

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

  const handleMouseUp = () => {
    if (!isActivelyDrawing || !currentRect || isSaving) {
      if (!isSaving) {
        setIsActivelyDrawing(false);
        setCurrentRect(null);
      }
      return;
    }

    if (Math.abs(currentRect.width) > 5 && Math.abs(currentRect.height) > 5) {
      const normalizedRect = {
        x:
          Math.min(currentRect.x, currentRect.x + currentRect.width) /
          imageScale,
        y:
          Math.min(currentRect.y, currentRect.y + currentRect.height) /
          imageScale,
        width: Math.abs(currentRect.width) / imageScale,
        height: Math.abs(currentRect.height) / imageScale,
      };

      const annotationData: CreateAnnotationDto = {
        imageId: image.id,
        type: "rectangle",
        x: normalizedRect.x,
        y: normalizedRect.y,
        width: normalizedRect.width,
        height: normalizedRect.height,
        color: currentRect.color,
      };

      setIsSaving(true);
      setIsActivelyDrawing(false);
      setCurrentRect(null);

      createAnnotation.mutate(annotationData, {
        onSettled: () => {
          setIsSaving(false);
        },
      });
    } else {
      setIsActivelyDrawing(false);
      setCurrentRect(null);
    }
  };

  const handleDelete = (annotationId: number) => {
    setAnnotationToDelete(annotationId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (annotationToDelete !== null) {
      deleteAnnotation.mutate(annotationToDelete);
      setDeleteDialogOpen(false);
      setAnnotationToDelete(null);
    }
  };

  const renderAnnotation = (annotation: Annotation) => {
    const x = annotation.x * imageScale;
    const y = annotation.y * imageScale;
    const width = annotation.width * imageScale;
    const height = annotation.height * imageScale;

    return (
      <Rect
        key={annotation.id}
        x={x}
        y={y}
        width={width}
        height={height}
        fill={annotation.color}
        opacity={0.3}
        stroke={annotation.color}
        strokeWidth={2}
        draggable={!isDrawingMode}
        listening={!isDrawingMode}
        onDragEnd={() => {}}
      />
    );
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 2,
          backgroundColor: "background.light",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Box>
              <Button
                variant="contained"
                size="small"
                sx={{ textTransform: "none" }}
                onClick={() => setIsDrawingMode(!isDrawingMode)}
              >
                {isDrawingMode ? "Drawing Mode Active" : "Start Drawing"}
              </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Box component="span" sx={{ fontSize: "0.875rem" }}>
                Color:
              </Box>
              {COLORS.map((color) => (
                <Tooltip key={color} title={color}>
                  <Box
                    onClick={() => setSelectedColor(color)}
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: color,
                      border:
                        selectedColor === color
                          ? "3px solid #000"
                          : "2px solid #ccc",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        transform: "scale(1.1)",
                      },
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
          </Box>
          <Box sx={{ fontSize: "0.875rem", color: "text.secondary" }}>
            {isDrawingMode
              ? "Click and drag on the image to draw a rectangle"
              : "Click 'Start Drawing' to add annotations"}
          </Box>
        </Box>

        <Box
          ref={containerRef}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            overflow: "hidden",
            backgroundColor: "#f5f5f5",
          }}
        >
          {konvaImage && (
            <Stage
              width={stageSize.width}
              height={stageSize.height}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              style={{ cursor: isDrawingMode ? "crosshair" : "default" }}
            >
              <Layer>
                <KonvaImage
                  image={konvaImage}
                  width={stageSize.width}
                  height={stageSize.height}
                  listening={isDrawingMode}
                />
                {annotations.map(renderAnnotation)}
                {currentRect && isActivelyDrawing && (
                  <Rect
                    x={currentRect.x}
                    y={currentRect.y}
                    width={currentRect.width}
                    height={currentRect.height}
                    fill={currentRect.color}
                    opacity={0.3}
                    stroke={currentRect.color}
                    strokeWidth={2}
                    listening={false}
                  />
                )}
              </Layer>
            </Stage>
          )}
        </Box>
      </Paper>

      {annotations.length > 0 && (
        <Paper
          elevation={1}
          sx={{
            p: 2,
            backgroundColor: "background.light",
          }}
        >
          <Box sx={{ mb: 2, fontWeight: 600, fontSize: "1rem" }}>
            Existing Annotations ({annotations.length})
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {annotations.map((annotation) => (
              <Box
                key={annotation.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 1,
                  backgroundColor: "background.paper",
                }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: annotation.color,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 1,
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                    Rectangle
                  </Box>
                  <Box sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                    Position: ({Math.round(annotation.x)},{" "}
                    {Math.round(annotation.y)}) | Size:{" "}
                    {Math.round(annotation.width)} ×{" "}
                    {Math.round(annotation.height)}
                  </Box>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(annotation.id)}
                  color="error"
                  disabled={deleteAnnotation.isPending}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setAnnotationToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Annotation"
        message="Are you sure you want to delete this annotation? This action cannot be undone."
        isLoading={deleteAnnotation.isPending}
      />
    </Box>
  );
}
