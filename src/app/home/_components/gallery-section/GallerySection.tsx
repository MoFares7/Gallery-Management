import SecondaryCard from "@/components/cards/SecondaryCard";
import PrimaryCard from "@/components/cards/PrimaryCard";
import { useGetImages } from "@/services/image.service";
import { Alert, Box, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import HandleStatusSection from "@/components/handles/HandleStateSection";

export default function GallerySection() {
  const router = useRouter();
  const { data: images, isLoading, error } = useGetImages();

  const displayedImages = useMemo(() => {
    if (!images) return [];
    return images.slice(0, 8);
  }, [images]);

  return (
    <PrimaryCard title="Image Gallery" href="/gallery">
      <Box>
        {isLoading ? (
          <HandleStatusSection type="loading" />
        ) : error ? (
          <HandleStatusSection type="error" />
        ) : (
          <Grid container spacing={2}>
            {displayedImages && displayedImages.length > 0 ? (
              displayedImages?.map((image) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={image.id}>
                  <SecondaryCard
                    image={image}
                    onClick={() => router.push(`/gallery/${image.id}`)}
                  />
                </Grid>
              ))
            ) : (
              <Grid size={{ xs: 12 }}>
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
