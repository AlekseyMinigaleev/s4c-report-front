import { AxiosResponse } from "axios";
import { userCreditionals } from "../../models/UserCreditionals";
import anonymousApi from "../../api/anonymousApi";
import { authenticationTokens } from "../../models/AuthenticationTokens";
import { developerInfo } from "../../models/DeveloperInfo";

export interface LoginPayload {
  userCreditionals: userCreditionals;
}

export interface LoginResponse {
  authorizationTokens: authenticationTokens;
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
