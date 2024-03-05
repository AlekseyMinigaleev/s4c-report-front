import { AxiosResponse } from "axios";
import { userCreditionals } from "../../models/userCreditionals";
import anonymousApi from "../../api/anonymousApi";
import { AuthenticationTokens } from "../../models/authenticationTokens";
import {developerInfo } from "../../models/developerInfo";

export interface LoginPayload {
  userCreditionals: userCreditionals;
}

export interface LoginResponse {
  authorizationTokens: AuthenticationTokens;
  developerInfo: developerInfo;
}

export default function useLogin() {
  async function login(
    payload: LoginPayload
  ): Promise<AxiosResponse<LoginResponse, any>> {
    const response = await anonymousApi.post<LoginResponse>(
      "authentication/login",
      JSON.stringify(payload),
      {
        withCredentials: true,
      }
    );

    return response;
  }

  return login;
}
