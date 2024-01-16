import { AxiosResponse } from "axios";
import api from "../axios";
import { UserCreditionals } from "./models/UserCreditionals";
import { AuthenticationTokens } from "../../models/AuthenticationTokens";

export interface LoginPayload {
  userCreditionals: UserCreditionals;
}

export async function Login(
  payload: LoginPayload
): Promise<AxiosResponse<AuthenticationTokens, any>> {
  const response = await api.post<AuthenticationTokens>(
    "authentication/login",
    JSON.stringify(payload)
  );

  return response;
}
