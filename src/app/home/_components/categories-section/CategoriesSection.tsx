import { getCategoryColor, getCategoryIcon } from "@/constants";
import { useGetCategories } from "@/services/category.service";
import PrimaryCard from "@/components/cards/PrimaryCard";
import { Paper, Tooltip, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function CategoriesSection() {
  const router = useRouter();
  const { data: categories } = useGetCategories();

  const displayedCategories = useMemo(() => {
    if (!categories) return [];
    return categories.slice(0, 10);
  }, [categories]);

  const handleView = (categoryId: number) => {
    router.push(`/categories/${categoryId}`);
  };

  return (
    <PrimaryCard title="Categories" href="/categories">
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {displayedCategories && displayedCategories?.length > 0 ? (
          displayedCategories?.map((category) => (
            // @ts-expect-error MUI v7 Grid types don't include item prop but it works at runtime
            <Grid item xs={6} sm={4} md={3} lg={2.4} key={category.id}>
              <Tooltip title={category.description || category.name} arrow>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    borderRadius: 3,
                    backgroundColor: getCategoryColor(category.id),
                    color: "white",
                    position: "relative",
                    minHeight: 120,
                    width: { xs: 320, sm: 220, md: 220, lg: 220 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                    },
                  }}
                  onClick={() => handleView(category.id)}
                >
                  <Box
                    sx={{
                      fontSize: "2.5rem",
                      fontWeight: 700,
                      mb: 1,
                      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    {getCategoryIcon(category.name)}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.75rem",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      opacity: 0.95,
                    }}
                    noWrap
                  >
                    {category.name}
                  </Typography>
                </Paper>
              </Tooltip>
            </Grid>
          ))
        ) : (
          // @ts-expect-error MUI v7 Grid types don't include item prop but it works at runtime

          <Grid item xs={12}>
            <Typography variant="body2" color="text.secondary">
              No categories found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </PrimaryCard>
  );
}
