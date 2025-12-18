import CategoryCard from "@/components/cards/CategoryCard";
import PrimaryCard from "@/components/cards/PrimaryCard";
import { useGetCategories } from "@/services/category.service";
import { material } from "@/lib/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import HandleStatusSection from "@/components/handles/HandleStateSection";

export default function CategoriesSection() {
  const router = useRouter();
  const { data: categories, isLoading, error } = useGetCategories();

  const displayedCategories = useMemo(() => {
    if (!categories) return [];
    return categories.slice(0, 10);
  }, [categories]);

  const handleView = (categoryId: number) => {
    router.push(`/categories/${categoryId}`);
  };

  if (isLoading) {
    return <HandleStatusSection type="loading" />;
  }

  if (error) {
    return <HandleStatusSection type="error" />;
  }

  return (
    <PrimaryCard title="Categories" href="/categories">
      <material.Grid container spacing={2} sx={{ justifyContent: "center" }}>
        {displayedCategories && displayedCategories?.length > 0 ? (
          displayedCategories?.map((category) => (
            <material.Grid
              size={{ xs: 6, sm: 4, md: 3, lg: 2.4, xl: 2 }}
              key={category.id}
            >
              <CategoryCard
                category={category}
                onClick={() => handleView(category.id)}
              />
            </material.Grid>
          ))
        ) : (
          <HandleStatusSection type="empty" />
        )}
      </material.Grid>
    </PrimaryCard>
  );
}
