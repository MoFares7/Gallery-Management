import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/types/category";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../endpoints/category";

const CATEGORIES_QUERY_KEY = "categories";

export const useGetCategories = () => {
  return useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: () => getAllCategories({}),
  });
};

export const useGetCategoryByID = (id: number) => {
  return useQuery({
    queryKey: [CATEGORIES_QUERY_KEY, id],
    queryFn: () => getCategoryById(id, {}),
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryDto) => createCategory(data, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
      toast.success("Category created successfully");
    },
    onError: () => {
      toast.error("Failed to create category");
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryDto }) =>
      updateCategory(id, data, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
      toast.success("Category updated successfully");
    },
    onError: () => {
      toast.error("Failed to update category");
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCategory(id, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: ["images"] });
      toast.success("Category deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete category");
    },
  });
};
