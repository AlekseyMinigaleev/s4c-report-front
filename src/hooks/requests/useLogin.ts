import { AxiosResponse } from "axios";
import { UserCreditionals } from "../../models/UserCreditionals";
import anonymousApi from "../../api/anonymousApi";
import { AuthenticationTokens } from "../../models/AuthenticationTokens";

export interface LoginPayload {
  userCreditionals: UserCreditionals;
}

export default function useLogin() {
  async function login(
    payload: LoginPayload
  ): Promise<AxiosResponse<AuthenticationTokens, any>> {
    const response = await anonymousApi.post<AuthenticationTokens>(
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
