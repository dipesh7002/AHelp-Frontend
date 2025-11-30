import { api } from "@/services/axiosConfig";
import { useCallback } from "react";

const usePostUser = () => {
  const postUser = useCallback(async () => {
    const response = await api.post("/api/authentication/user/");
    return response.data;
  }, []);

  return { postUser };
};


export default usePostUser

