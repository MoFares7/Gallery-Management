import { axiosInstance } from "@/utils/api";
import { Image, CreateImageDto, UpdateImageDto } from "@/types/image";

const endPoint = "images";

export const getAllImages = async (options: Record<string, unknown> = {}) => {
  const res = await axiosInstance.get<Image[]>(`/${endPoint}`, {
    params: options,
  });
  return res.data;
};

export const getImageById = async (
  id: number,
  options: Record<string, unknown> = {}
) => {
  const res = await axiosInstance.get<Image>(`/${endPoint}/${id}`, {
    params: options,
  });
  return res.data;
};

export const createImage = async (
  data: CreateImageDto,
  options: Record<string, unknown> = {}
) => {
  const res = await axiosInstance.post<Image>(`/${endPoint}`, data, {
    params: options,
  });
  return res.data;
};

export const updateImage = async (
  id: number,
  data: UpdateImageDto,
  options: Record<string, unknown> = {}
) => {
  const res = await axiosInstance.put<Image>(`/${endPoint}/${id}`, data, {
    params: options,
  });
  return res.data;
};

export const deleteImage = async (
  id: number,
  options: Record<string, unknown> = {}
) => {
  const res = await axiosInstance.delete<void>(`/${endPoint}/${id}`, {
    params: options,
  });
  return res.data;
};
