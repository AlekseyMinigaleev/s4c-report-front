import axios, { AxiosError } from "axios";
import { BASE_URL } from "./constants";

const anonymousApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

anonymousApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.resolve(error.response);
  }
);

export default anonymousApi;
