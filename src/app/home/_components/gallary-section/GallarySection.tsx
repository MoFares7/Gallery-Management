import GalleryCard from "@/components/cards/GalleryCard";
import PrimaryCard from "@/components/cards/PrimaryCard";
import { useImages } from "@/hooks/useImages";
import { Alert, Box, CircularProgress, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function GallarySection() {
  const router = useRouter();
  const { data: images, isLoading } = useImages();

  const displayedImages = useMemo(() => {
    if (!images) return [];
    return images.slice(0, 8);
  }, [images]);

  return (
    <PrimaryCard title="Image Gallery" href="/gallary">
      <Box>
        {isLoading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {displayedImages && displayedImages.length > 0 ? (
              displayedImages.map((image) => (
                // @ts-expect-error MUI v7 Grid types don't include item prop but it works at runtime
                <Grid item xs={12} sm={6} md={4} lg={3} key={image.id}>
                  <GalleryCard
                    image={image}
                    onClick={() => router.push(`/gallary/${image.id}`)}
                  />
                </Grid>
              ))
            ) : (
              // @ts-expect-error MUI v7 Grid types don't include item prop but it works at runtime
              <Grid item xs={12}>
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                  No images found.
                </Alert>
              </Grid>
            )}
          </Grid>
        )}
      </Box>
    </PrimaryCard>
  );
}
