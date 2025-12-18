"use client";
import SecondaryCard from "@/components/cards/SecondaryCard";
import PageHeader from "@/components/header/PageHeader";
import AddEditImageGallary from "@/app/gallery/_components/add-edit/AddEditImageGallary";
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog";
import GalleryFilters from "@/app/gallery/_components/filter/GalleryFilters";
import { Box, Container, Grid } from "@mui/material";
import { useState } from "react";
import { useGalleryHome } from "../../_hooks/useGalleryHome";
import HandleStatusSection from "@/components/handles/HandleStateSection";

export default function HomeGallery() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const {
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
    handleView,
    handleConfirmDelete,
    handleUploadSubmit,
    createMutation,
    deleteMutation,
  } = useGalleryHome();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        background: "background.gradient",
      }}
    >
      <Container maxWidth="xl" sx={{ pt: 16, pb: 8 }}>
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
          <Grid container spacing={3}>
            {filteredImages && filteredImages.length > 0 ? (
              filteredImages.map((image) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={image.id}>
                  <SecondaryCard
                    image={image}
                    onClick={() => handleView(image)}
                    onClickDelete={() => handleDelete(image)}
                    isAbleAction={true}
                  />
                </Grid>
              ))
            ) : (
              <Grid size={{ xs: 12 }}>
                <HandleStatusSection type="empty" />
              </Grid>
            )}
          </Grid>
        )}

        <AddEditImageGallary
          open={uploadOpen}
          onClose={() => setUploadOpen(false)}
          onSubmit={handleUploadSubmit}
          isLoading={createMutation.isPending}
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
      </Container>
    </Box>
  );
}
