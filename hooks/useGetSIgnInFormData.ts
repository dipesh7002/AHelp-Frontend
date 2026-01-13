import { api } from "@/services/axiosConfig";
import { useCallback } from "react";

const useGetUserFormData = () => {
  const getUserForm = useCallback(async () => {
    const response = await api.get("/api/auth/user-form/");
    return response.data;
  }, []);

  return { getUserForm };
};


export default useGetUserFormData

