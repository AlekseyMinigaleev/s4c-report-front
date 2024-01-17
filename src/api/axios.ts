import axios, { AxiosError } from "axios";

const BASE_URL = "http://localhost:5041/api/";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.resolve(error.response);
  }
);

export default api;

export const apiPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
