/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import axiosInstance from "../services/ApiClient";

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: any;
}

const useApi = <T,>(url: string): UseApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data from API:", url);
      try {
        const response = await axiosInstance.get(url);
        console.log("Data fetched successfully:", response.data);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useApi;
