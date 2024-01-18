import axios from "axios";
import { BASE_URL } from "./constants";

export const authorizedApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
