import { api } from "@/services/axiosConfig";
import { useCallback } from "react";
import { saveAuthTokens, AuthTokens } from "@/utils/auth";

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

    const tokens: AuthTokens = {
      access: response.data.access,
      refresh: response.data.refresh,
      role: response.data.role,
      email_verified: response.data.email_verified,
    };
    console.log("*****************************************************")
    console.log("*****************************************************")
    console.log(tokens)
    console.log("*****************************************************")
    console.log("*****************************************************")

    saveAuthTokens(tokens);
    return tokens;
  }, []);

  return { loginUser };
};

export default useLoginUser;
