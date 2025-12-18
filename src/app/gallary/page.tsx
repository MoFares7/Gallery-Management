"use client";

import ImageFiltersComponent from "@/components/images/ImageFilters";
import ImageUpload from "@/components/images/ImageUpload";
import DeleteConfirmationDialog from "@/components/modals/DeleteConfirmationDialog";
import { useCreateImage, useDeleteImage, useImages } from "@/hooks/useImages";
import { Image, ImageFilters } from "@/types/image";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function GalleryPage() {
  const router = useRouter();
  const { data: images, isLoading, error } = useImages();
  const createMutation = useCreateImage();
  const deleteMutation = useDeleteImage();

  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Image | undefined>();
  const [filters, setFilters] = useState<ImageFilters>({});

  const filteredImages = useMemo(() => {
    if (!images) return [];

    return images.filter((image) => {
      if (
        filters.name &&
        !image.name.toLowerCase().includes(filters.name.toLowerCase())
      ) {
        return false;
      }

      if (filters.categoryId && image.categoryId !== filters.categoryId) {
        return false;
      }

      if (filters.minWidth && (image.metadata?.width || 0) < filters.minWidth) {
        return false;
      }

      if (
        filters.minHeight &&
        (image.metadata?.height || 0) < filters.minHeight
      ) {
        return false;
      }

      return true;
    });
  }, [images, filters]);

  const handleDelete = (image: Image) => {
    setSelectedImage(image);
    setDeleteDialogOpen(true);
  };

  const handleView = (image: Image) => {
    router.push(`/gallary/${image.id}`);
  };

  const handleConfirmDelete = () => {
    if (selectedImage) {
      deleteMutation.mutate(selectedImage.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedImage(undefined);
        },
      });
    }
  };

  const handleUploadSubmit = (data: {
    name: string;
    url: string;
    categoryId?: number;
    metadata?: {
      size?: number;
      width?: number;
      height?: number;
      format?: string;
    };
  }) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setUploadOpen(false);
      },
    });
  };

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

        <ImageFiltersComponent filters={filters} onFiltersChange={setFilters} />

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
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 3,
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                      },
                    }}
                    onClick={() => handleView(image)}
                  >
                    <CardMedia
                      component="img"
                      image={image.url}
                      alt={image.name}
                      sx={{
                        height: 240,
                        objectFit: "cover",
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        component="h2"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          fontSize: "1.1rem",
                          mb: 1,
                        }}
                        noWrap
                      >
                        {image.name}
                      </Typography>
                      {image.category && (
                        <Chip
                          label={image.category.name}
                          size="small"
                          sx={{
                            mb: 1,
                            bgcolor: "#e3f2fd",
                            color: "#1976d2",
                            fontWeight: 500,
                          }}
                        />
                      )}
                      {image.metadata && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          sx={{ fontSize: "0.75rem" }}
                        >
                          {image.metadata.width} × {image.metadata.height}
                          {image.metadata.size && (
                            <> • {(image.metadata.size / 1024).toFixed(2)} KB</>
                          )}
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions
                      sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
                    >
                      <Button
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(image);
                        }}
                        sx={{ textTransform: "none" }}
                      >
                        View
                      </Button>
                      <IconButton
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(image);
                        }}
                        aria-label="delete"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
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
