// axiosInstance.js
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  method: "get",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      return;
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
