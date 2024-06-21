import axios, { AxiosError } from "axios";
import { BASE_URL } from "./constants";

export const authorizedApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

authorizedApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.resolve(error.response);
  }
);

