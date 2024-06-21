import { authenticationTokens } from "../../models/AuthenticationTokens";
import anonymousApi from "../../api/anonymousApi";
import useAuthContext from "../useAuthContext";

export default function useRefreshToken() {
  const authContext = useAuthContext();

  async function refresh() {
    const response = await anonymousApi.get<authenticationTokens>(
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
