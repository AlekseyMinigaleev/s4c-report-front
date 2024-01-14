import api from "../axios";
import { UserCreditionals } from "./UserCreditionals";

export interface LoginPayload {
  userCreditionals: UserCreditionals;
}

export interface LoginResponse {
  jwtToken: string;
}

export async function Login(
  payload: LoginPayload
): Promise<LoginResponse | string> {
  const response = await api.post(
    "authentication/login",
    JSON.stringify(payload)
  );
  let result: LoginResponse | string = "";

  if (response.status == 400) {
    result = response.data?.NotFound[0];
  }

  if (response.status == 200) {
    result = {
      jwtToken: response.data,
    };
  }

  return result;
}
