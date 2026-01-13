import { api } from "@/services/axiosConfig";
import { useCallback } from "react";

interface LoginPayload {
  email: string;
  password: string;
}

const useLoginUser = () => {
  const loginUser = useCallback(async (data: LoginPayload) => {
    const response = await api.post("/api/token/", data);

    if (response.status !== 200) {
      throw new Error("Invalid credentials");
    }

    return response.data; // access + refresh token
  }, []);

  return { loginUser };
};

export default useLoginUser;
