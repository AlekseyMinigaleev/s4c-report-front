import { AxiosResponse } from "axios";
import { UserCreditionals } from "../../models/UserCreditionals";
import anonymousApi from "../../api/anonymousApi";
import { AuthenticationTokens } from "../../models/AuthenticationTokens";
import { DeveloperInfo } from "../../models/DeveloperInfo";

export interface LoginPayload {
  userCreditionals: UserCreditionals;
}

export interface LoginResponse {
  authorizationTokens: AuthenticationTokens;
  developerInfo: DeveloperInfo;
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
