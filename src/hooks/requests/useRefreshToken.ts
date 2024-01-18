import anonymousApi from "../../api/anonymousApi";
import { AuthenticationTokens } from "../../models/AuthenticationTokens";
import useAuthentification from "../userAuthentificationt";


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