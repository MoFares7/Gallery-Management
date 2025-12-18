"use client";
import SecondaryCard from "@/components/cards/SecondaryCard";
import HandleStatusSection from "@/components/handles/HandleStateSection";
import { getCategoryColor } from "@/constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useCategoriesDetails } from "../../_hooks/useCategoriesDetails";

export default function CategoriesDetails() {
  const router = useRouter();
  const { category, isLoading, error, categoryImages, handleBack } =
    useCategoriesDetails();

  if (isLoading) {
    return <HandleStatusSection type="loading" />;
  }

  if (error || !category) {
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
          Back to Categories
        </Button>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "background.paper",
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              mb: 3,
            }}
          >
            <Paper
              elevation={4}
              sx={{
                width: 120,
                height: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: getCategoryColor(category.id),
                color: "white",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              {category?.image ? (
                <Box
                  component="img"
                  src={category?.image}
                  alt={category?.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 700,
                    fontSize: "4rem",
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  {category.name.charAt(0).toUpperCase()}
                </Typography>
              )}
            </Paper>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h3"
                component="h1"
                sx={{ fontWeight: 700, mb: 1 }}
              >
                {category?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {category?.description}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key="total-images">
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    backgroundColor: "background.light",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Total Images
                  </Typography>
                  <Typography variant="h4" fontWeight={700}>
                    {categoryImages.length}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {categoryImages.length > 0 && (
          <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Images in this Category ({categoryImages.length})
            </Typography>
            <Grid container spacing={3}>
              {categoryImages.map((image) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={image.id}>
                  <SecondaryCard
                    image={image}
                    onClick={() => router.push(`/gallery/${image.id}`)}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {categoryImages.length === 0 && <HandleStatusSection type="empty" />}
      </Container>
    </Box>
  );
}
