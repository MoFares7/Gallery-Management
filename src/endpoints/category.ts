import { axiosInstance } from "@/utils/api";
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/types/category";

const endPoint = "categories";

export const getAllCategories = async (
  options: Record<string, unknown> = {}
) => {
  const res = await axiosInstance.get<Category[]>(`/${endPoint}`, {
    params: options,
  });
  return res.data;
};

export const getCategoryById = async (
  id: number,
  options: Record<string, unknown> = {}
) => {
  const res = await axiosInstance.get<Category>(`/${endPoint}/${id}`, {
    params: options,
  });
  return res.data;
};

export const createCategory = async (
  data: CreateCategoryDto,
  options: Record<string, unknown> = {}
) => {
  const res = await axiosInstance.post<Category>(`/${endPoint}`, data, {
    params: options,
  });
  return res.data;
};

export const updateCategory = async (
  id: number,
  data: UpdateCategoryDto,
  options: Record<string, unknown> = {}
) => {
  const res = await axiosInstance.put<Category>(`/${endPoint}/${id}`, data, {
    params: options,
  });
  return res.data;
};

export const deleteCategory = async (
  id: number,
  options: Record<string, unknown> = {}
) => {
  const res = await axiosInstance.delete<void>(`/${endPoint}/${id}`, {
    params: options,
  });
  return res.data;
};
