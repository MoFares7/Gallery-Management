import {
  useCreateCategory,
  useDeleteCategory,
  useGetCategories,
  useUpdateCategory,
} from "@/services/category.service";
import { Category } from "@/types/category";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useCategoriesHome = () => {
  const router = useRouter();
  const { data: categories, isLoading, error } = useGetCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleCreate = () => {
    setSelectedCategory(undefined);
    setFormOpen(true);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setFormOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleView = (category: Category) => {
    router.push(`/categories/${category.id}`);
  };

  const handleFormSubmit = (data: { name: string; description?: string }) => {
    if (selectedCategory) {
      updateMutation.mutate(
        { id: selectedCategory.id, data },
        {
          onSuccess: () => {
            setFormOpen(false);
            setSelectedCategory(undefined);
          },
        }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setFormOpen(false);
        },
      });
    }
  };

  const handleConfirmDelete = () => {
    if (selectedCategory) {
      deleteMutation.mutate(selectedCategory.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setSelectedCategory(undefined);
        },
      });
    }
  };

  return {
    categories,
    isLoading,
    error,
    formOpen,
    setFormOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedCategory,
    setSelectedCategory,
    hoveredId,
    setHoveredId,
    handleCreate,
    handleEdit,
    handleDelete,
    handleView,
    handleFormSubmit,
    handleConfirmDelete,
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
