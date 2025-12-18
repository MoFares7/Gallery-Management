import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://my-json-server.typicode.com/MostafaKMilly/demo",
  headers: {
    Accept: "*/*",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
