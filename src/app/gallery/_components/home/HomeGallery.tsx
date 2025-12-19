"use client";
import AddEditImageGallary from "@/app/gallery/_components/add-edit/AddEditImageGallary";
import GalleryFilters from "@/app/gallery/_components/filter/GalleryFilters";
import SecondaryCard from "@/components/cards/SecondaryCard";
import HandleStatusSection from "@/components/handles/HandleStateSection";
import PageHeader from "@/components/header/PageHeader";
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog";
import { material } from "@/lib/material";
import { useGalleryHome } from "../../_hooks/useGalleryHome";

export default function HomeGallery() {
  const {
    filtersOpen,
    setFiltersOpen,
    uploadOpen,
    setUploadOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedImage,
    setSelectedImage,
    filters,
    setFilters,
    filteredImages,
    isLoading,
    error,
    handleDelete,
    handleEdit,
    handleView,
    handleConfirmDelete,
    handleUploadSubmit,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useGalleryHome();

  return (
    <material.Box>
      <PageHeader
        title="Image Gallery"
        buttonText="Upload Image"
        onClick={() => setUploadOpen(true)}
        isHasFilters={true}
        onFiltersClick={() => setFiltersOpen(true)}
      />

      {isLoading ? (
        <HandleStatusSection type="loading" />
      ) : error ? (
        <HandleStatusSection type="error" />
      ) : (
        <material.Grid container spacing={3}>
          {filteredImages && filteredImages.length > 0 ? (
            filteredImages.map((image) => (
              <material.Grid
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={image.id}
              >
                <SecondaryCard
                  image={image}
                  onClick={() => handleView(image)}
                  onClickEdit={() => handleEdit(image)}
                  onClickDelete={() => handleDelete(image)}
                  isAbleAction={true}
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

      <AddEditImageGallary
        open={uploadOpen}
        onClose={() => {
          setUploadOpen(false);
          setSelectedImage(undefined);
        }}
        onSubmit={handleUploadSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
        imageToEdit={selectedImage}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedImage(undefined);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Image"
        message={`Are you sure you want to delete "${selectedImage?.name}"? This action cannot be undone.`}
        isLoading={deleteMutation.isPending}
      />

      <GalleryFilters
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </material.Box>
  );
}
