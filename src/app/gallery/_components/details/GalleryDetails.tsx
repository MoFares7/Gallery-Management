"use client";
import { useGalleryDetails } from "@/app/gallery/_hooks/useGalleryDetails";
import HandleStatusSection from "@/components/handles/HandleStateSection";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";

export default function GalleryDetails() {
  const { image, isLoading, error, handleBack } = useGalleryDetails();

  if (isLoading) {
    return <HandleStatusSection type="loading" />;
  }

  if (error || !image) {
    return <HandleStatusSection type="error" />;
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      File Size
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {image?.metadata?.size}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Resolution
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      textTransform="uppercase"
                    >
                      {image?.metadata?.resolution}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
