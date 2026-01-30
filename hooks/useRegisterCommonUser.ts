import { api } from "@/services/axiosConfig";
import { useCallback } from "react";

interface RegisterPayload {
    first_name: string;
    middle_name?: string;
    last_name: string;
  email: string;
  password: string;
  role?: 'common' | 'helper' | 'admin';
}

const useRegisterUser = () => {
  const registerUser = useCallback(
    async (data: RegisterPayload) => {
      const response = await api.post("/api/auth/user/", data);

      if (response.status !== 201 && response.status !== 200) {
        throw new Error("Registration failed");
      }

      return response.data;
    },
    []
  );

  return { registerUser };
};

export default useRegisterUser;
