"use client";

import HandleStatusSection from "@/components/handles/HandleStateSection";
import { Annotation } from "@/types/annotation";
import { Image } from "@/types/image";
import { material } from "@/lib/material";
import { Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import { useAddEditAnnotation } from "../../_hooks/useAddEditAnnotation";

interface AddEditAnnotationProps {
  image: Image;
  annotationToEdit?: Annotation | null;
  onClose?: () => void;
  isModal?: boolean;
}

export default function AddEditAnnotation({
  image,
  annotationToEdit = null,
  onClose,
  isModal = false,
}: AddEditAnnotationProps) {
  const {
    COLORS,
    selectedColor,
    setSelectedColor,
    isDrawingMode,
    setIsDrawingMode,
    isActivelyDrawing,
    currentRect,
    isSaving,
    editingAnnotationId,
    stageSize,
    ContainerRef,
    annotations,
    isLoading,
    konvaImage,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleEditAnnotation,
    renderAnnotation,
  } = useAddEditAnnotation(image, annotationToEdit, onClose, isModal);

  const content = (
    <material.Box>
      <material.Paper
        elevation={1}
        sx={{
          p: 2,
          mb: 2,
          backgroundColor: "background.light",
        }}
      >
        <material.Box sx={{ mb: 2 }}>
          <material.Box
            sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
          >
            <material.Box>
              <material.Button
                variant="contained"
                size="small"
                sx={{ textTransform: "none" }}
                onClick={() => setIsDrawingMode(!isDrawingMode)}
              >
                {isDrawingMode ? "Drawing Mode Active" : "Start Drawing"}
              </material.Button>
            </material.Box>
            <material.Box
              sx={{ display: "flex", gap: 1, alignItems: "center" }}
            >
              {COLORS.map((color) => (
                <material.Tooltip key={color} title={color}>
                  <material.Box
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
                </material.Tooltip>
              ))}
            </material.Box>
          </material.Box>
        </material.Box>

        <material.Box
          ref={ContainerRef}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
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
                {annotations.map((annotation) => {
                  const rendered = renderAnnotation(annotation);
                  return (
                    <Rect
                      key={annotation.id}
                      x={rendered.x}
                      y={rendered.y}
                      width={rendered.width}
                      height={rendered.height}
                      fill={rendered.annotation.color}
                      opacity={rendered.isEditing ? 0.5 : 0.3}
                      stroke={rendered.annotation.color}
                      strokeWidth={rendered.isEditing ? 3 : 2}
                      draggable={!isDrawingMode && !rendered.isEditing}
                      listening={true}
                      onDragEnd={() => {}}
                      onClick={() => {
                        if (!isDrawingMode && !rendered.isEditing) {
                          handleEditAnnotation(annotation);
                        }
                      }}
                    />
                  );
                })}
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
        </material.Box>
      </material.Paper>
    </material.Box>
  );

  if (isLoading) {
    return <HandleStatusSection type="loading" />;
  }

  if (isModal) {
    return (
      <material.Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
        <material.DialogTitle>
          {editingAnnotationId ? "Edit Annotation" : "Create Annotation"}
        </material.DialogTitle>
        <material.DialogContent>{content}</material.DialogContent>
        <material.DialogActions>
          <material.Button onClick={onClose} disabled={isSaving}>
            Close
          </material.Button>
        </material.DialogActions>
      </material.Dialog>
    );
  }
  return content;
}
