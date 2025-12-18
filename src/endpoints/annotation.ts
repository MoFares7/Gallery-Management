import { axiosInstance } from "@/utils/api";
import {
  Annotation,
  CreateAnnotationDto,
  UpdateAnnotationDto,
} from "@/types/annotation";

const endPoint = "annotations";

export const getAllAnnotations = async (
  options: Record<string, unknown> = {}
) => {
  const res = await axiosInstance.get<Annotation[]>(`/${endPoint}`, {
    params: options,
  });
  return res.data;
};

export const getAnnotationsByImageId = async (
  imageId: number,
  options: Record<string, unknown> = {}
) => {
  const res = await axiosInstance.get<Annotation[]>(
    `/images/${imageId}/${endPoint}`,
    {
      params: options,
    }
  );
  return res.data;
};

export const createAnnotation = async (
  data: CreateAnnotationDto,
  options: Record<string, unknown> = {}
) => {
  const res = await axiosInstance.post<Annotation>(`/${endPoint}`, data, {
    params: options,
  });
  return res.data;
};

export const updateAnnotation = async (
  id: number,
  data: UpdateAnnotationDto,
  options: Record<string, unknown> = {}
) => {
  const res = await axiosInstance.put<Annotation>(`/${endPoint}/${id}`, data, {
    params: options,
  });
  return res.data;
};

export const deleteAnnotation = async (
  id: number,
  options: Record<string, unknown> = {}
) => {
  const res = await axiosInstance.delete<void>(`/${endPoint}/${id}`, {
    params: options,
  });
  return res.data;
};
