import useAuthorizedApi from "../useAuthorizedApi";

export interface errorMessages {
  error: string[];
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
  ): Promise<errorMessages> {
    const payload: setRsyaAuthorizationTokenPayload = {
      rsyaAythorizationToken: {
        token: token,
      },
    };

    const response = await api.put<errorMessages>(
      `user/set-rsya-authorization-token`,
      payload
    );

    return response.data;
  }

  return setRsyaAuthorizationToken;
}
