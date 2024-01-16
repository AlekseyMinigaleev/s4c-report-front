import axios, { AxiosError } from "axios";
const api = axios.create({
  baseURL: "http://localhost:5041/api/",
});

api.interceptors.request.use((config) => {
  // config.headers["Authorization"] = `Bearer ${authorizationContext?.auth}`;
  if (!config.headers["Content-Type"]) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.resolve(error.response);
  }
);

export default api;
