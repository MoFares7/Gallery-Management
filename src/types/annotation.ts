export interface AnnotationApiResponse {
  id: number;
  imageId: number;
  type: "rectangle" | "circle" | "line";
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  color: string;
  label?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Annotation {
  id: number;
  imageId: number;
  type: "rectangle" | "circle" | "line";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  label?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAnnotationApiDto {
  imageId: number;
  type: "rectangle" | "circle" | "line";
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  color: string;
  label?: string;
}

export interface CreateAnnotationDto {
  imageId: number;
  type: "rectangle" | "circle" | "line";
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  label?: string;
}

export interface UpdateAnnotationApiDto {
  type?: "rectangle" | "circle" | "line";
  coordinates?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  };
  color?: string;
  label?: string;
}

export interface UpdateAnnotationDto {
  type?: "rectangle" | "circle" | "line";
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  color?: string;
  label?: string;
}
