import useAuthorizedApi from "../useAuthorizedApi";

export interface CHLENI {
  errorMessages: string[];
}

export interface rsyaAythorizationToken {
  token: string;
}

export interface setRsyaAuthorizationTokenPayload {
  rsyaAythorizationToken: rsyaAythorizationToken;
}

export default function useSetRsyaAuthorizationToken() {
  const api = useAuthorizedApi();

  async function setRsyaAuthorizationToken(
    token: string
  ): Promise<{ ErrorMessages: string[] }> {
    const payload: setRsyaAuthorizationTokenPayload = {
      rsyaAythorizationToken: {
        token: token,
      },
    };

    const response = await api.put<{ ErrorMessages: string[] }>(
      `user/set-rsya-authorization-token`,
      payload
    );

    return response.data;
  }

  return setRsyaAuthorizationToken;
}
