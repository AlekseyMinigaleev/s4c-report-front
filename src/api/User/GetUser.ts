import api from "../axios";

export interface GetUserRsponse {
  email: string;
  developerPageUrl: string;
  rsyaAuthorizationToken: string;
}

export async function GetUser(): Promise<GetUserRsponse> {
  api.interceptors.request.use((config) => {
    return config;
  });

  const response = await api.get<GetUserRsponse>("User/getUser");

  return response.data;
}
