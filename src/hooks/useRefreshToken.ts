import useAuthentification from "./userAuthentificationt";

import { AuthenticationTokens } from "../models/AuthenticationTokens";
import anonymousApi from "../api/anonymousApi";

export default function useRefreshToken() {
  const authContext = useAuthentification();

  async function refresh() {
    const response = await anonymousApi.get<AuthenticationTokens>(
      "Authentication/refresh",
      {
        withCredentials: true,
      }
    );
    authContext.setAuth({
      accessToken: response.data.accessToken,
    });
    return response.data.accessToken;
  }

  return refresh;
}
