import axios from "axios";
import { getAccessToken } from "@/utils/auth";

 const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add auth token to requests
  instance.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export const api = createAxiosInstance()
