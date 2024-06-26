import useApiPrivate from "../useAuthorizedApi";

export interface FetchUserRsponse {
  email: string;
  developerPageUrl: string;
  rsyaAuthorizationToken: string;
}

export default function useGetUserInfo() {
  const apiPrivate = useApiPrivate();

  async function fetchUser() {
    const response = await apiPrivate.get<FetchUserRsponse>("User/getUser");

    return response.data;
  }

  return fetchUser;
}
