"use client";

import {
  useAnnotationsByImageId,
  useCreateAnnotation,
  useDeleteAnnotation,
} from "@/services/annotation.service";
import { CreateAnnotationDto } from "@/types/annotation";
import { Image } from "@/types/image";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { toast } from "react-toastify";

interface ImageAnnotationProps {
  image: Image;
  onClose?: () => void;
}

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  id?: number;
}

export default function ImageAnnotation({
  image,
  onClose,
}: ImageAnnotationProps) {
  const { data: annotations, isLoading } = useAnnotationsByImageId(image.id);
  const createMutation = useCreateAnnotation();
  const deleteMutation = useDeleteAnnotation();

  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null
  );
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const [selectedColor, setSelectedColor] = useState("#ff0000");
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentRect, setCurrentRect] = useState<Rectangle | null>(null);
  const [selectedRectId, setSelectedRectId] = useState<number | null>(null);
  const [localRectangles, setLocalRectangles] = useState<Rectangle[]>([]);
  const stageRef = useRef<React.ComponentRef<typeof Stage>>(null);

  // Convert annotations to rectangles (derived state)
  // Annotations are stored in image coordinates, need to scale to stage coordinates
  const rectangles = useMemo(() => {
    const scaleX = imageElement ? stageSize.width / imageElement.width : 1;
    const scaleY = imageElement ? stageSize.height / imageElement.height : 1;

    const annotationRects = annotations
      ? annotations.map((ann) => ({
          x: ann.x * scaleX,
          y: ann.y * scaleY,
          width: ann.width * scaleX,
          height: ann.height * scaleY,
          color: ann.color,
          id: ann.id,
        }))
      : [];

    // Merge with local rectangles (unsaved ones)
    // Filter out local rectangles that have been saved (have matching annotation)
    const unsavedRects = localRectangles.filter(
      (localRect) =>
        !localRect.id || !annotationRects.some((ann) => ann.id === localRect.id)
    );

    return [...annotationRects, ...unsavedRects];
  }, [annotations, localRectangles, imageElement, stageSize]);

  const colors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
    "#ff8800",
    "#8800ff",
  ];

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = image.url;
    img.onload = () => {
      setImageElement(img);
      const containerWidth = Math.min(window.innerWidth - 100, 1200);
      const maxWidth = containerWidth;
      const maxHeight = 600;
      const aspectRatio = img.width / img.height;

      let width = maxWidth;
      let height = maxWidth / aspectRatio;

      if (height > maxHeight) {
        height = maxHeight;
        width = maxHeight * aspectRatio;
      }

      setStageSize({ width, height });
    };
    img.onerror = () => {
      toast.error("Failed to load image");
    };
  }, [image.url]);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;

    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    setIsDrawing(true);
    setCurrentRect({
      x: pointerPos.x,
      y: pointerPos.y,
      width: 0,
      height: 0,
      color: selectedColor,
    });
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing || !currentRect) return;

    const stage = e.target.getStage();
    if (!stage) return;

    const pointerPos = stage.getPointerPosition();
    if (!pointerPos) return;

    const newRect = {
      ...currentRect,
      width: pointerPos.x - currentRect.x,
      height: pointerPos.y - currentRect.y,
    };

    setCurrentRect(newRect);
  };

  const handleMouseUp = () => {
    if (
      isDrawing &&
      currentRect &&
      Math.abs(currentRect.width) > 5 &&
      Math.abs(currentRect.height) > 5
    ) {
      const normalizedRect = {
        ...currentRect,
        x:
          currentRect.width < 0
            ? currentRect.x + currentRect.width
            : currentRect.x,
        y:
          currentRect.height < 0
            ? currentRect.y + currentRect.height
            : currentRect.y,
        width: Math.abs(currentRect.width),
        height: Math.abs(currentRect.height),
      };

      setLocalRectangles([...localRectangles, normalizedRect]);
    }

    setIsDrawing(false);
    setCurrentRect(null);
  };

  const handleSaveAnnotation = (rect: Rectangle) => {
    if (!rect.id) {
      // Calculate actual coordinates based on image dimensions
      const scaleX = imageElement ? imageElement.width / stageSize.width : 1;
      const scaleY = imageElement ? imageElement.height / stageSize.height : 1;

      const annotationData: CreateAnnotationDto = {
        imageId: image.id,
        type: "rectangle",
        x: rect.x * scaleX,
        y: rect.y * scaleY,
        width: rect.width * scaleX,
        height: rect.height * scaleY,
        color: rect.color,
      };

      createMutation.mutate(annotationData);
    }
  };

  const handleDeleteAnnotation = (rectId: number) => {
    deleteMutation.mutate(rectId);
  };

  const handleRectClick = (
    e: KonvaEventObject<MouseEvent>,
    rect: Rectangle
  ) => {
    e.cancelBubble = true;
    if (rect.id) {
      setSelectedRectId(rect.id);
    }
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
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
          <Typography variant="h6">Drawing Tool</Typography>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Color</InputLabel>
            <Select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              label="Color"
            >
              {colors.map((color) => (
                <MenuItem key={color} value={color}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: color,
                        border: "1px solid #ccc",
                        borderRadius: 1,
                      }}
                    />
                    {color}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="body2" color="text.secondary">
            Click and drag to draw rectangles
          </Typography>
        </Box>
      </Paper>

      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: 1,
          overflow: "hidden",
          display: "inline-block",
        }}
      >
        <Stage
          ref={stageRef}
          width={stageSize.width}
          height={stageSize.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            {imageElement && (
              <KonvaImage
                image={imageElement}
                width={stageSize.width}
                height={stageSize.height}
              />
            )}
            {rectangles.map((rect, index) => (
              <Rect
                key={rect.id || `temp-${index}`}
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                fill={rect.color}
                opacity={0.3}
                stroke={rect.color}
                strokeWidth={2}
                onClick={(e) => handleRectClick(e, rect)}
                draggable={!rect.id}
                onDragEnd={(e) => {
                  if (!rect.id) {
                    const rectIndex = localRectangles.findIndex(
                      (r) =>
                        r === rect ||
                        (r.x === rect.x &&
                          r.y === rect.y &&
                          r.width === rect.width &&
                          r.height === rect.height)
                    );
                    if (rectIndex !== -1) {
                      const updatedRects = [...localRectangles];
                      updatedRects[rectIndex] = {
                        ...rect,
                        x: e.target.x(),
                        y: e.target.y(),
                      };
                      setLocalRectangles(updatedRects);
                    }
                  }
                }}
              />
            ))}
            {currentRect && (
              <Rect
                x={currentRect.x}
                y={currentRect.y}
                width={currentRect.width}
                height={currentRect.height}
                fill={currentRect.color}
                opacity={0.3}
                stroke={currentRect.color}
                strokeWidth={2}
              />
            )}
          </Layer>
        </Stage>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Annotations ({rectangles.length})
        </Typography>
        <Box display="flex" flexDirection="column" gap={1}>
          {rectangles.map((rect, index) => (
            <Paper
              key={rect.id || `temp-${index}`}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor:
                  selectedRectId === rect.id
                    ? "action.selected"
                    : "background.paper",
              }}
            >
              <Box display="flex" gap={2} alignItems="center">
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: rect.color,
                    border: "1px solid #ccc",
                    borderRadius: 1,
                  }}
                />
                <Typography variant="body2">
                  Rectangle {index + 1} - {Math.round(rect.width)} ×{" "}
                  {Math.round(rect.height)}
                </Typography>
              </Box>
              <Box display="flex" gap={1}>
                {!rect.id && (
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    onClick={() => handleSaveAnnotation(rect)}
                    disabled={createMutation.isPending}
                  >
                    Save
                  </Button>
                )}
                {rect.id && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDeleteAnnotation(rect.id!)}
                    disabled={deleteMutation.isPending}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            </Paper>
          ))}
          {rectangles.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No annotations yet. Draw rectangles on the image above.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
