import useApiPrivate from "../useApiPrivate";

export interface FetchUserRsponse {
  email: string;
  developerPageUrl: string;
  rsyaAuthorizationToken: string;
}

export default function useFetchUser() {
  const apiPrivate = useApiPrivate();

  async function fetchUser() {
    const response = await apiPrivate.get<FetchUserRsponse>("User/getUser");

    return response.data;
  }

  return fetchUser;
}
