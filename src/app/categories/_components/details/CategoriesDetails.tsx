"use client";
import SecondaryCard from "@/components/cards/SecondaryCard";
import HandleStatusSection from "@/components/handles/HandleStateSection";
import { getCategoryColor } from "@/constants";
import { useNavigation } from "@/hooks/useNavigation";
import { material } from "@/lib/material";
import { materialIcons } from "@/lib/material-icons";
import { useCategoriesDetails } from "../../_hooks/useCategoriesDetails";

export default function CategoriesDetails() {
  const { push } = useNavigation();
  const { category, isLoading, error, categoryImages, handleBack } =
    useCategoriesDetails();

  return (
    <material.Box>
      {isLoading ? (
        <HandleStatusSection type="loading" />
      ) : error ? (
        <HandleStatusSection type="error" />
      ) : !category ? (
        <HandleStatusSection type="empty" />
      ) : (
        <>
          <material.Button
            startIcon={<materialIcons.arrowBack />}
            onClick={handleBack}
            sx={{ mb: 3, textTransform: "none" }}
          >
            Back to Categories
          </material.Button>
          <material.Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              backgroundColor: "background.paper",
              mb: 4,
            }}
          >
            <material.Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                mb: 3,
              }}
            >
              <material.Paper
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
                  <material.Box
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
                  <material.Typography
                    variant="h1"
                    sx={{
                      fontWeight: 700,
                      fontSize: "4rem",
                      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    {category.name.charAt(0).toUpperCase()}
                  </material.Typography>
                )}
              </material.Paper>
              <material.Box sx={{ flex: 1 }}>
                <material.Typography
                  variant="h3"
                  component="h1"
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  {category?.name}
                </material.Typography>
                <material.Typography variant="body1" color="text.secondary">
                  {category?.description}
                </material.Typography>
              </material.Box>
            </material.Box>

            <material.Divider sx={{ my: 3 }} />

            <material.Box>
              <material.Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Statistics
              </material.Typography>
              <material.Grid container spacing={2}>
                <material.Grid
                  size={{ xs: 12, sm: 6, md: 4 }}
                  key="total-images"
                >
                  <material.Paper
                    elevation={1}
                    sx={{
                      p: 2,
                      backgroundColor: "background.light",
                      borderRadius: 2,
                    }}
                  >
                    <material.Typography variant="body2" color="text.secondary">
                      Total Images
                    </material.Typography>
                    <material.Typography variant="h4" fontWeight={700}>
                      {categoryImages.length}
                    </material.Typography>
                  </material.Paper>
                </material.Grid>
              </material.Grid>
            </material.Box>
          </material.Paper>

          {categoryImages.length > 0 && (
            <material.Box>
              <material.Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Images in this Category ({categoryImages.length})
              </material.Typography>
              <material.Grid container spacing={3}>
                {categoryImages.map((image) => (
                  <material.Grid size={{ xs: 12, sm: 6, md: 4 }} key={image.id}>
                    <SecondaryCard
                      image={image}
                      onClick={() => push(`/gallery/${image.id}`)}
                    />
                  </material.Grid>
                ))}
              </material.Grid>
            </material.Box>
          )}
        </>
      )}
    </material.Box>
  );
}
