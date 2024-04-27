import { AxiosResponse } from "axios";
import useAuthorizedApi from "../useAuthorizedApi";

export interface CHLENI {
  errorMessages: string[];
}

export interface rsyaAythorizationToken {
  token: string | null;
}

export interface setRsyaAuthorizationTokenPayload {
  rsyaAythorizationToken: rsyaAythorizationToken;
}

export default function useSetRsyaAuthorizationToken() {
  const api = useAuthorizedApi();

  async function setRsyaAuthorizationToken(token: string): Promise<
    AxiosResponse<
      {
        ErrorMessages: string[];
      },
      any
    >
  > {
    const payload: setRsyaAuthorizationTokenPayload = {
      rsyaAythorizationToken: {
        token: token == "" ? null : token,
      },
    };

    const response = await api.put<{ ErrorMessages: string[] }>(
      `user/set-rsya-authorization-token`,
      payload
    );

    return response;
  }

  return setRsyaAuthorizationToken;
}
