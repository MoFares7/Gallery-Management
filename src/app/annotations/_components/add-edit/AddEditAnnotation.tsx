"use client";

import HandleStatusSection from "@/components/handles/HandleStateSection";
import { Annotation } from "@/types/annotation";
import { Image } from "@/types/image";
import { material } from "@/lib/material";
import { Image as KonvaImage, Layer, Rect, Stage } from "react-konva";
import { useAddEditAnnotation } from "../../_hooks/useAddEditAnnotation";
import PrimaryButton from "@/components/buttons/PrimaryButton";

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
            sx={{
              display: { xs: "block", md: "flex" },
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <material.Box>
              <PrimaryButton
                variant="contained"
                onClick={() => setIsDrawingMode(!isDrawingMode)}
                buttonText={
                  isDrawingMode ? "Drawing Mode Active" : "Start Drawing"
                }
                disabled={!!pendingRect}
              />
            </material.Box>
            <material.Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                pt: { xs: 2, md: 0 },
              }}
            >
              {COLORS.map((color) => (
                <material.Tooltip key={color} title={color}>
                  <material.Box
                    onClick={() => setSelectedColor(color)}
                    sx={{
                      width: { xs: 24, md: 32 },
                      height: { xs: 24, md: 32 },
                      backgroundColor: color,
                      border:
                        selectedColor === color
                          ? "2px solid #000"
                          : "2px solid #ccc",
                      borderRadius: "100%",
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
            {pendingRect && (
              <material.Box
                sx={{
                  display: "flex",
                  gap: 1,
                  ml: "auto",
                  pt: { xs: 2, md: 0 },
                }}
              >
                <PrimaryButton
                  variant="outlined"
                  onClick={handleCancel}
                  buttonText="Cancel"
                  disabled={isSaving}
                  backgroundColor="background.paper"
                  hoverBackgroundColor="background.default"
                />
                <PrimaryButton
                  variant="contained"
                  onClick={handleSave}
                  buttonText={isSaving ? "Saving..." : "Save"}
                  disabled={isSaving}
                />
              </material.Box>
            )}
          </material.Box>
        </material.Box>

        <material.Box
          ref={ContainerRef}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
            maxHeight: { xs: "30vh", md: "none" },
          }}
        >
          {konvaImage && (
            <Stage
              width={stageSize.width}
              height={stageSize.height}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
              style={{
                cursor: isDrawingMode ? "crosshair" : "default",
                touchAction: isDrawingMode ? "none" : "auto",
              }}
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
                {pendingRect && !isActivelyDrawing && (
                  <Rect
                    x={pendingRect.x}
                    y={pendingRect.y}
                    width={pendingRect.width}
                    height={pendingRect.height}
                    fill={pendingRect.color}
                    opacity={0.5}
                    stroke={pendingRect.color}
                    strokeWidth={3}
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

  if (isImageLoading) {
    return (
      <material.Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
        }}
      >
        <HandleStatusSection type="loading" />
      </material.Box>
    );
  }

  if (isModal) {
    return (
      <material.Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
        <material.DialogTitle>
          {editingAnnotationId ? "Edit Annotation" : "Create Annotation"}
        </material.DialogTitle>
        <material.DialogContent>{content}</material.DialogContent>
        <material.DialogActions>
          <PrimaryButton
            variant="outlined"
            buttonText="Close"
            onClick={() => onClose?.()}
            disabled={isSaving}
            backgroundColor="background.paper"
            hoverBackgroundColor="background.default"
          />
        </material.DialogActions>
      </material.Dialog>
    );
  }
  return content;
}
