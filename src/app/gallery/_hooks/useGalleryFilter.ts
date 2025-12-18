import { useGetCategories } from "@/services/category.service";
import { ImageFilters } from "@/types/image";

export const useGalleryFilter = ({
  filters,
  onFiltersChange,
}: {
  filters: ImageFilters;
  onFiltersChange: (filters: ImageFilters) => void;
}) => {
  const { data: categories } = useGetCategories();

  const handleFilterChange = (
    key: keyof ImageFilters,
    value: string | number | undefined
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(
    (key) => filters[key as keyof ImageFilters] !== undefined
  );
  return {
    filters,
    handleFilterChange,
    handleClearFilters,
    hasActiveFilters,
    categories,
  };
};
