import axios from "axios";

 const createAxiosInstance = () => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const api = createAxiosInstance()
