import axios, { AxiosError } from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5041/api/",
});

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosInstance;