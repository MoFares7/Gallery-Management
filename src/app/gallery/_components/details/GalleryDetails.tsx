"use client";
import { useGalleryDetails } from "@/app/gallery/_hooks/useGalleryDetails";
import HandleStatusSection from "@/components/handles/HandleStateSection";
import { material } from "@/lib/material";
import { materialIcons } from "@/lib/material-icons";
// import dayjs from "dayjs";

export default function GalleryDetails() {
  const { image, isLoading, error, handleBack } = useGalleryDetails();

  return (
    <material.Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        background: "background.gradient",
      }}
    >
      <material.Container maxWidth="lg" sx={{ pt: 16, pb: 8 }}>
        {isLoading ? (
          <HandleStatusSection type="loading" />
        ) : error ? (
          <HandleStatusSection type="error" />
        ) : (
          <>
            <material.Button
              startIcon={<materialIcons.arrowBack />}
              onClick={handleBack}
              sx={{ mb: 3, textTransform: "none" }}
            >
              Back to Gallery
            </material.Button>
            <material.Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                backgroundColor: "background.paper",
              }}
            >
              <material.Box sx={{ mb: 4 }}>
                <material.Typography
                  variant="h3"
                  component="h1"
                  sx={{ fontWeight: 700, mb: 2 }}
                >
                  {image?.name}
                </material.Typography>
                {image?.category && (
                  <material.Chip
                    label={image?.category.name}
                    sx={{
                      bgcolor: (theme) => theme.palette.primary.light + "20",
                      color: "primary.main",
                      fontWeight: 500,
                      fontSize: "0.9rem",
                      height: 32,
                    }}
                  />
                )}
              </material.Box>

              <material.Box
                sx={{
                  mb: 4,
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                }}
              >
                <material.Box
                  component="img"
                  src={image?.url}
                  alt={image?.name}
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </material.Box>

              <material.Paper
                elevation={1}
                sx={{
                  p: 3,
                  mb: 4,
                  backgroundColor: "background.light",
                  borderRadius: 2,
                }}
              >
                <material.Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: 600 }}
                >
                  Image Details
                </material.Typography>
                <material.Divider sx={{ mb: 2 }} />
                <material.Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <material.Grid container spacing={2}>
                    <material.Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <material.Box>
                        <material.Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          File Size
                        </material.Typography>
                        <material.Typography variant="body1" fontWeight={500}>
                          {image?.metadata?.size}
                        </material.Typography>
                      </material.Box>
                    </material.Grid>
                    <material.Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <material.Box>
                        <material.Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          Resolution
                        </material.Typography>
                        <material.Typography
                          variant="body1"
                          fontWeight={500}
                          textTransform="uppercase"
                        >
                          {image?.metadata?.resolution}
                        </material.Typography>
                      </material.Box>
                    </material.Grid>
                    <material.Grid size={{ xs: 12, sm: 6, md: 4 }}>
                      <material.Box>
                        <material.Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          Created At
                        </material.Typography>
                        <material.Typography variant="body1" fontWeight={500}>
                          {image?.uploadDate.split("T")[0]}
                        </material.Typography>
                      </material.Box>
                    </material.Grid>
                  </material.Grid>
                </material.Box>
              </material.Paper>
            </material.Paper>
          </>
        )}
      </material.Container>
    </material.Box>
  );
}
