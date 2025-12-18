"use client";
import { useGalleryDetails } from "@/app/gallery/_hooks/useGalleryDetails";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import dynamic from "next/dynamic";

const ImageAnnotation = dynamic(
  () => import("@/components/annotations/ImageAnnotation"),
  {
    ssr: false,
    loading: () => (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    ),
  }
);

export default function GalleryDetails() {
  const {
    image,
    isLoading,
    error,
    showAnnotation,
    handleBack,
    toggleAnnotation,
  } = useGalleryDetails();

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !image) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <Container maxWidth="xl" sx={{ pt: 16, pb: 8 }}>
          <Alert severity="error">
            Failed to load image. Please try again.
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        background: "background.gradient",
      }}
    >
      <Container maxWidth="lg" sx={{ pt: 16, pb: 8 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 3, textTransform: "none" }}
        >
          Back to Gallery
        </Button>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "background.paper",
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              {image.name}
            </Typography>
            {image.category && (
              <Chip
                label={image.category.name}
                sx={{
                  bgcolor: (theme) => theme.palette.primary.light + "20",
                  color: "primary.main",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  height: 32,
                }}
              />
            )}
          </Box>

          <Box
            sx={{
              mb: 4,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          >
            <Box
              component="img"
              src={image.url}
              alt={image.name}
              sx={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </Box>

          {image.metadata && (
            <Paper
              elevation={1}
              sx={{
                p: 3,
                mb: 4,
                backgroundColor: "background.light",
                borderRadius: 2,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Image Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {image.metadata.width && image.metadata.height && (
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Dimensions
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {image.metadata.width} × {image.metadata.height} pixels
                    </Typography>
                  </Box>
                )}
                {image.metadata.size && (
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      File Size
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {(image.metadata.size / 1024).toFixed(2)} KB
                    </Typography>
                  </Box>
                )}
                {image.metadata.format && (
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Format
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      textTransform="uppercase"
                    >
                      {image.metadata.format}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Paper>
          )}

          <Button
            variant="contained"
            onClick={toggleAnnotation}
            sx={{
              mb: 3,
              textTransform: "none",
              borderRadius: 2,
            }}
          >
            {showAnnotation ? "Hide" : "Show"} Annotations
          </Button>

          {showAnnotation && image && (
            <Box
              sx={{
                mt: 3,
                p: 3,
                borderRadius: 2,
                backgroundColor: "background.light",
              }}
            >
              <ImageAnnotation image={image} />
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
