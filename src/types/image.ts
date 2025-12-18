export interface Image {
  id: number;
  name: string;
  url: string;
  categoryId?: number;
  category?: {
    id: number;
    name: string;
  };
  metadata?: {
    size?: number;
    resolution?: string;
  };
  uploadDate: string;
}

export interface CreateImageDto {
  name: string;
  url: string;
  categoryId?: number;
  metadata?: {
    size?: number;
    width?: number;
    height?: number;
    format?: string;
  };
}

export interface UpdateImageDto {
  name?: string;
  categoryId?: number;
  metadata?: {
    size?: number;
    width?: number;
    height?: number;
    format?: string;
  };
}

export interface ImageFilters {
  name?: string;
  categoryId?: number;
  metadata?: {
    size?: string;
    resolution?: string;
  };
}
