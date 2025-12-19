import { useGetCategories } from "@/services/category.service";
import { ImageFilters } from "@/types/image";

interface FormValues {
  name: string;
  categoryId: number | undefined;
  metadata: {
    size: string;
    resolution: string;
  };
}

export const useGalleryFilter = ({
  filters,
  onFiltersChange,
  onClose,
}: {
  filters: ImageFilters;
  onFiltersChange: (filters: ImageFilters) => void;
  onClose: () => void;
}) => {
  const { data: categories } = useGetCategories();

  const initialValues: FormValues = {
    name: filters.name ?? "",
    categoryId: filters.categoryId,
    metadata: {
      size: filters.metadata?.size ?? "",
      resolution: filters.metadata?.resolution ?? "",
    },
  };

  const handleSubmit = (values: FormValues) => {
    const newFilters: ImageFilters = {
      name: values.name || undefined,
      categoryId: values.categoryId,
      metadata: {
        size: values.metadata.size || undefined,
        resolution: values.metadata.resolution || undefined,
      },
    };

    if (!newFilters.metadata?.size && !newFilters.metadata?.resolution) {
      delete newFilters.metadata;
    }

    onFiltersChange(newFilters);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

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
    handleSubmit,
    handleCancel,
    initialValues,
    filters,
    handleFilterChange,
    handleClearFilters,
    hasActiveFilters,
    categories,
  };
};
