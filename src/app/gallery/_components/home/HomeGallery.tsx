"use client";
import GalleryCard from "@/components/cards/GalleryCard";
import PageHeader from "@/components/header/PageHeader";
import ImageUpload from "@/app/gallery/_components/image-upload/ImageUpload";
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog";
import GalleryFilters from "@/app/gallery/_components/filter/GalleryFilters";
import { Alert, Box, CircularProgress, Container, Grid } from "@mui/material";
import { useState } from "react";
import { useGalleryHome } from "../../_hooks/useGalleryHome";

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
    // handleDelete,
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
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ m: 2 }}>
            Failed to load images. Please try again.
          </Alert>
        ) : (
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {filteredImages && filteredImages.length > 0 ? (
              filteredImages.map((image) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
                  <GalleryCard
                    image={image}
                    onClick={() => handleView(image)}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                  {filters && Object.keys(filters).length > 0
                    ? "No images match the current filters."
                    : "No images found. Upload one to get started."}
                </Alert>
              </Grid>
            )}
          </Grid>
        )}

        <ImageUpload
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
