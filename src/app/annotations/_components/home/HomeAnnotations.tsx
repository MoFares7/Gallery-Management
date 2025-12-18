"use client";

import SecondaryCard from "@/components/cards/SecondaryCard";
import PageHeader from "@/components/header/PageHeader";
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog";
import dynamic from "next/dynamic";
import { material } from "@/lib/material";

const AddEditAnnotation = dynamic(
  () => import("@/app/annotations/_components/add-edit/AddEditAnnotation"),
  {
    ssr: false,
    loading: () => <HandleStatusSection type="loading" />,
  }
);
import { useAnnotationsHome } from "../../_hooks/useAnnotationsHome";
import { useGetImages } from "@/services/image.service";
import { useMemo, useState } from "react";
import { Image } from "@/types/image";
import HandleStatusSection from "@/components/handles/HandleStateSection";

export default function HomeAnnotations() {
  const {
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
    handleEdit,
    handleDelete,
    handleView,
    handleConfirmDelete,
    deleteMutation,
  } = useAnnotationsHome();

  const { data: images } = useGetImages();
  const [imageSelectOpen, setImageSelectOpen] = useState(false);
  const [tempSelectedImage, setTempSelectedImage] = useState<Image | null>(
    null
  );

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

  return (
    <material.Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        background: "background.gradient",
      }}
    >
      <material.Container maxWidth="xl" sx={{ pt: 16, pb: 8 }}>
        <PageHeader
          title="Annotations"
          buttonText="Create Annotation"
          onClick={handleCreateClick}
        />

        {isLoading ? (
          <HandleStatusSection type="loading" />
        ) : error ? (
          <HandleStatusSection type="error" />
        ) : (
          <material.Grid
            container
            spacing={3}
            sx={{ justifyContent: "center" }}
          >
            {annotationsByImage.size > 0 ? (
              Array.from(annotationsByImage.entries()).map(
                ([imageId, imageAnnotations]) => {
                  const image = imageMap.get(imageId);
                  if (!image) return null;
                  const firstAnnotation = imageAnnotations[0];

                  return (
                    <material.Grid
                      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                      key={imageId}
                    >
                      <SecondaryCard
                        image={image}
                        onClick={() => handleView(firstAnnotation)}
                        onClickEdit={() => {
                          handleEdit(firstAnnotation);
                        }}
                        onClickDelete={() => {
                          handleDelete(firstAnnotation);
                        }}
                        isAbleAction={true}
                      />
                    </material.Grid>
                  );
                }
              )
            ) : (
              <material.Grid size={{ xs: 12 }}>
                <HandleStatusSection type="empty" />
              </material.Grid>
            )}
          </material.Grid>
        )}

        <material.Dialog
          open={imageSelectOpen}
          onClose={() => setImageSelectOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <material.DialogTitle>
            Select Image for Annotation
          </material.DialogTitle>
          <material.DialogContent>
            <material.Grid container spacing={2} sx={{ mt: 1 }}>
              {images?.map((img) => (
                <material.Grid size={{ xs: 6, sm: 4, md: 3 }} key={img.id}>
                  <material.Box
                    onClick={() => handleImageSelect(img)}
                    sx={{
                      cursor: "pointer",
                      border:
                        tempSelectedImage?.id === img.id
                          ? "3px solid"
                          : "2px solid",
                      borderColor:
                        tempSelectedImage?.id === img.id
                          ? "primary.main"
                          : "divider",
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "all 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <material.Box
                      component="img"
                      src={img.url}
                      alt={img.name}
                      sx={{
                        width: "100%",
                        height: 150,
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <material.Box
                      sx={{
                        p: 1,
                        textAlign: "center",
                        backgroundColor: "background.paper",
                      }}
                    >
                      <material.Box
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {img.name}
                      </material.Box>
                    </material.Box>
                  </material.Box>
                </material.Grid>
              ))}
            </material.Grid>
          </material.DialogContent>
          <material.DialogActions>
            <material.Button
              onClick={() => {
                setImageSelectOpen(false);
                setTempSelectedImage(null);
              }}
            >
              Cancel
            </material.Button>
            <material.Button
              onClick={handleImageSelectConfirm}
              variant="contained"
              disabled={!tempSelectedImage}
            >
              Continue
            </material.Button>
          </material.DialogActions>
        </material.Dialog>

        {formOpen && (selectedImage || imageForEdit) && (
          <AddEditAnnotation
            image={selectedImage || imageForEdit!}
            annotationToEdit={selectedAnnotation || null}
            onClose={() => {
              setFormOpen(false);
              setSelectedAnnotation(undefined);
              setSelectedImage(null);
              setTempSelectedImage(null);
            }}
            isModal={true}
          />
        )}

        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onClose={() => {
            setDeleteDialogOpen(false);
            setSelectedAnnotation(undefined);
          }}
          onConfirm={handleConfirmDelete}
          title="Delete Annotation"
          message={`Are you sure you want to delete this annotation? This action cannot be undone.`}
          isLoading={deleteMutation.isPending}
        />
      </material.Container>
    </material.Box>
  );
}
