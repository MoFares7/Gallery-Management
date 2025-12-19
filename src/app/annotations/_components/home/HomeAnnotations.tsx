"use client";

import SecondaryCard from "@/components/cards/SecondaryCard";
import HandleStatusSection from "@/components/handles/HandleStateSection";
import PageHeader from "@/components/header/PageHeader";
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog";
import { material } from "@/lib/material";
import dynamic from "next/dynamic";
import { useAnnotationsHome } from "../../_hooks/useAnnotationsHome";
import SelectAnnotationDialog from "../add-edit/SelectAnnotationDialog";

const AddEditAnnotation = dynamic(
  () => import("@/app/annotations/_components/add-edit/AddEditAnnotation"),
  {
    ssr: false,
    loading: () => <HandleStatusSection type="loading" />,
  }
);

export default function HomeAnnotations() {
  const {
    isLoading,
    error,
    formOpen,
    setFormOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    imageSelectOpen,
    setImageSelectOpen,
    selectedAnnotation,
    setSelectedAnnotation,
    selectedImage,
    setSelectedImage,
    tempSelectedImage,
    setTempSelectedImage,
    annotationsWithImages,
    imageForEdit,
    images,
    handleEdit,
    handleDelete,
    handleView,
    handleCreateClick,
    handleImageSelectConfirm,
    handleImageSelect,
    handleConfirmDelete,
    deleteMutation,
  } = useAnnotationsHome();

  return (
    <material.Box>
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
        <material.Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {annotationsWithImages && annotationsWithImages.length > 0 ? (
            annotationsWithImages.map(({ image, annotation }) => (
              <material.Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={image.id}
              >
                <SecondaryCard
                  image={image}
                  onClick={() => handleView(annotation)}
                  onClickEdit={() => handleEdit(annotation)}
                  onClickDelete={() => handleDelete(annotation)}
                  isAbleAction
                  isHasDetails={false}
                />
              </material.Grid>
            ))
          ) : (
            <material.Grid size={{ xs: 12 }}>
              <HandleStatusSection type="empty" />
            </material.Grid>
          )}
        </material.Grid>
      )}

      <SelectAnnotationDialog
        open={imageSelectOpen}
        onClose={() => setImageSelectOpen(false)}
        images={images || []}
        handleImageSelectConfirm={handleImageSelectConfirm}
        handleImageSelect={handleImageSelect}
        tempSelectedImage={tempSelectedImage}
      />

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
    </material.Box>
  );
}
