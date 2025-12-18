/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from "axios";
import RequestConfig from "./request-config";
import { toast } from "react-toastify";

export interface IBaseApiResponse<T> {
  data: T;
}

export default class ApiProvider {
  api: AxiosInstance;

  getCookieValue(key: string): string | null {
    const equalities = document.cookie.split("; ");
    for (let i = 0; i < equalities.length; i++) {
      if (!equalities[i]) {
        continue;
      }

      const splitted = equalities[i].split("=");
      if (splitted.length !== 2) {
        continue;
      }

      if (decodeURIComponent(splitted[0]) === key) {
        return decodeURIComponent(splitted[1] || "");
      }
    }

    return null;
  }

  constructor(config: RequestConfig) {
    this.api = axios.create({
      ...config,
      baseURL:
        config.baseURL ||
        "https://my-json-server.typicode.com/MostafaKMilly/demo",
      url: undefined,
    });
    this.api.interceptors.request.use((req: any) => {
      return {
        ...req,
        headers: {
          ...req.headers,
          Accept: "*",
          ["x-access-token"]: this.getCookieValue("access_token"),
          ["Accept-Language"]: `${this.getCookieValue("language") ?? "en"}`,
          ["x-client"]: "d1pku79g8dqs73f1l1s0",
          // process.env.NEXT_PUBLIC_CLIENT_ID
        },
      };
    });
    this.api.interceptors.response.use(
      (res: AxiosResponse) => {
        if (res.data === "") {
          return { ...res, data: null };
        }
        return Array.isArray(res.data)
          ? res.data
          : {
              ...res?.data,
            };
      },
      (error: any) => {
        toast.error(error?.response?.data?.message ?? "Something went wrong");

        return error.response?.data;
      }
    );
  }

  async request<T>(config: RequestConfig): Promise<any> {
    return await this.api.request<IBaseApiResponse<T>>(config);
  }
}
