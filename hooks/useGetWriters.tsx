import { api } from "@/services/axiosConfig";
import { useCallback } from "react";

const useGetWriters = () => {
  const getWriters = useCallback(async () => {
    const response = await api.get("/api/helper/assignment-helper/");
    return response.data;
  }, []);

  return { getWriters };
};


export default useGetWriters
