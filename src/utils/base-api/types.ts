import ApiService from "@/utils/base-api/api-service";

const serviceName = "types";

class TypesService extends ApiService {
  constructor() {
    super({
      baseURL: "",
    });
  }

  async createTypeRequest<TRequest, TResponse = TRequest>(
    type: string,
    data: TRequest
  ) {
    const res = await this.post<TResponse>(`/${serviceName}/${type}`, data);
    return res;
  }

  async updateTypeRequest<T>(type: string, id: string, data: T) {
    const res = await this.patch<T>(`/${serviceName}/${type}/${id}`, data);
    return res;
  }

  async getTypeRequest<T>(type: string) {
    const res = await this.get<T>(`/${serviceName}/${type}`);
    return res;
  }

  async getTypeByIdRequest<T>(type: string, id: string) {
    const res = await this.get<T>(`/${serviceName}/${type}/${id}`);
    return res;
  }

  async getAllTypeRequest<T>(type: string) {
    const res = await this.get<T>(`/${serviceName}/${type}/all`);
    return res;
  }

  async deleteTypeRequest<T>(type: string, id: string) {
    const res = await this.delete<T>(`/${serviceName}/${type}/${id}`);
    return res;
  }
}
export const typesService = new TypesService();
