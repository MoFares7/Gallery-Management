import { getCategoryColor, getCategoryIcon } from "@/constants";
import { useGetCategories } from "@/services/category.service";
import PrimaryCard from "@/components/cards/PrimaryCard";
import { Paper, Tooltip, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import CategoryCard from "@/components/cards/CategoryCard";

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
              <CategoryCard
                category={category}
                onClick={() => handleView(category.id)}
              />
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
