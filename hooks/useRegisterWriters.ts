import { api } from "@/services/axiosConfig";
import { useCallback } from "react";

interface RegisterPayload {
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  password: string;
  education: string;          // Education ID (ForeignKey)
  pp: File;   // Profile picture image field
}


const useRegisterHelper = () => {
  const registerUser = useCallback(async (data: RegisterPayload) => {
    // Step 1: Create the user first (as JSON, matching the existing user registration)
    const userData: any = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      role: 'helper', // Set role to helper
    };
    
    if (data.middle_name) {
      userData.middle_name = data.middle_name;
    }

    let userResponse;
    try {
      userResponse = await api.post("/api/auth/user/", userData);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 
                          error?.response?.data?.message || 
                          error?.response?.data?.error ||
                          (typeof error?.response?.data === 'object' ? JSON.stringify(error.response.data) : "User registration failed");
      throw new Error(errorMessage);
    }

    if (userResponse.status !== 201 && userResponse.status !== 200) {
      throw new Error("User registration failed");
    }

    const userId = userResponse.data.id || userResponse.data.user?.id || userResponse.data.user_id;

    if (!userId) {
      throw new Error("User ID not found in response. Response: " + JSON.stringify(userResponse.data));
    }

    // Step 2: Create the AssignmentHelper with the user ID
    const helperFormData = new FormData();
    helperFormData.append("user", userId.toString());
    helperFormData.append("education", data.education);
    helperFormData.append("pp", data.pp);

    try {
      const helperResponse = await api.post(
        "/api/helper/assignment-helper/",
        helperFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (helperResponse.status !== 201 && helperResponse.status !== 200) {
        throw new Error("Helper registration failed");
      }

      return helperResponse.data;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.detail || 
                          error?.response?.data?.message || 
                          error?.response?.data?.error ||
                          (typeof error?.response?.data === 'object' ? JSON.stringify(error.response.data) : "Helper registration failed");
      throw new Error(errorMessage);
    }
  }, []);

  return { registerUser };
};

export default useRegisterHelper;
