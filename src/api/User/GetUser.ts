import useApiPrivate from "../../hooks/useApiPrivate";

export interface GetUserRsponse {
  email: string;
  developerPageUrl: string;
  rsyaAuthorizationToken: string;
}

export async function GetUser(): Promise<GetUserRsponse> {
  const apiPrivate = useApiPrivate();
  const response = await apiPrivate.get<GetUserRsponse>("User/getUser");

  return response.data;
}
