import React, { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuthentification from "./userAuthentificationt";
import { apiPrivate } from "../api/axios";

export default function useApiPrivate() {
  const refresh = useRefreshToken();
  const authentificationContext = useAuthentification();

  useEffect(() => {
    const requestIntercept = apiPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          const token = authentificationContext?.auth?.accessToken;
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = apiPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status == 401) {
          const newAccessToken = await refresh();
          if (newAccessToken) {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return apiPrivate(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      apiPrivate.interceptors.request.eject(requestIntercept);
      apiPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authentificationContext, refresh]);

  return apiPrivate;
}
