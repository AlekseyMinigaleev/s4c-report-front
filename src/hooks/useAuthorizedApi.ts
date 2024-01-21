import React, { useEffect } from "react";
import useAuthentification from "./useAuthentificationt";
import { authorizedApi } from "../api/authorizedApi";
import useRefreshToken from "./requests/useRefreshToken";

export default function useAuthorizedApi() {
  const refresh = useRefreshToken();
  const authentificationContext = useAuthentification();

  useEffect(() => {
    const requestIntercept = authorizedApi.interceptors.request.use(
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

    const responseIntercept = authorizedApi.interceptors.response.use(
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
            return authorizedApi(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      authorizedApi.interceptors.request.eject(requestIntercept);
      authorizedApi.interceptors.response.eject(responseIntercept);
    };
  }, [authentificationContext, refresh]);

  return authorizedApi;
}