import { AxiosResponse } from "axios";
import { UserCreditionals } from "../../models/userCreditionals";
import anonymousApi from "../../api/anonymousApi";
import { AuthenticationTokens } from "../../models/authenticationTokens";
import { DeveloperInfo } from "../../models/developerInfo";

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
