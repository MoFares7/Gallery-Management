import { axiosInstance } from "@/utils/api";
import {
  Annotation,
  AnnotationApiResponse,
  CreateAnnotationDto,
  CreateAnnotationApiDto,
  UpdateAnnotationDto,
  UpdateAnnotationApiDto,
} from "@/types/annotation";

const endPoint = "annotations";

const transformAnnotation = (
  apiAnnotation: AnnotationApiResponse
): Annotation => {
  return {
    id: apiAnnotation.id,
    imageId: apiAnnotation.imageId,
    type: apiAnnotation.type,
    x: apiAnnotation.coordinates.x,
    y: apiAnnotation.coordinates.y,
    width: apiAnnotation.coordinates.width,
    height: apiAnnotation.coordinates.height,
    color: apiAnnotation.color,
    label: apiAnnotation.label,
    createdAt: apiAnnotation.createdAt,
    updatedAt: apiAnnotation.updatedAt,
  };
};

const transformCreateDto = (
  dto: CreateAnnotationDto
): CreateAnnotationApiDto => {
  return {
    imageId: dto.imageId,
    type: dto.type,
    coordinates: {
      x: dto.x,
      y: dto.y,
      width: dto.width,
      height: dto.height,
    },
    color: dto.color,
    label: dto.label,
  };
};

const transformUpdateDto = (
  dto: UpdateAnnotationDto
): UpdateAnnotationApiDto => {
  const apiDto: UpdateAnnotationApiDto = {};

  if (dto.type !== undefined) apiDto.type = dto.type;
  if (dto.color !== undefined) apiDto.color = dto.color;
  if (dto.label !== undefined) apiDto.label = dto.label;

  if (
    dto.x !== undefined ||
    dto.y !== undefined ||
    dto.width !== undefined ||
    dto.height !== undefined
  ) {
    apiDto.coordinates = {};
    if (dto.x !== undefined) apiDto.coordinates.x = dto.x;
    if (dto.y !== undefined) apiDto.coordinates.y = dto.y;
    if (dto.width !== undefined) apiDto.coordinates.width = dto.width;
    if (dto.height !== undefined) apiDto.coordinates.height = dto.height;
  }

  return apiDto;
};

export const getAllAnnotations = async (
  options: Record<string, unknown> = {}
) => {
  const res = await axiosInstance.get<AnnotationApiResponse[]>(`/${endPoint}`, {
    params: options,
  });
  return res.data.map(transformAnnotation);
};

export const createAnnotation = async (
  data: CreateAnnotationDto,
  options: Record<string, unknown> = {}
) => {
  const apiData = transformCreateDto(data);
  const res = await axiosInstance.post<AnnotationApiResponse>(
    `/${endPoint}`,
    apiData,
    {
      params: options,
    }
  );
  return transformAnnotation(res.data);
};

export const updateAnnotation = async (
  id: number,
  data: UpdateAnnotationDto,
  options: Record<string, unknown> = {}
) => {
  const apiData = transformUpdateDto(data);
  const res = await axiosInstance.put<AnnotationApiResponse>(
    `/${endPoint}/${id}`,
    apiData,
    {
      params: options,
    }
  );
  return transformAnnotation(res.data);
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
