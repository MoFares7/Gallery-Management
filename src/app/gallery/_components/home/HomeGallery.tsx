"use client";
import GalleryCard from "@/components/cards/GalleryCard";
import ImageUpload from "@/components/images/ImageUpload";
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog";
import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useGalleryHome } from "../../_hooks/useGalleryHome";
import GalleryFilters from "../filter/GalleryFilters";

export default function HomeGallery() {
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
        backgroundColor: "#fafafa",
        background: "linear-gradient(to bottom, #ffffff 0%, #f5f7fa 100%)",
      }}
    >
      <Container maxWidth="xl" sx={{ pt: 16, pb: 8 }}>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
            Image Gallery
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setUploadOpen(true)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            Upload Image
          </Button>
        </Box>

        <GalleryFilters filters={filters} onFiltersChange={setFilters} />

        {isLoading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ m: 2 }}>
            Failed to load images. Please try again.
          </Alert>
        ) : (
          <Grid container spacing={3}>
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
      </Container>
    </Box>
  );
}
