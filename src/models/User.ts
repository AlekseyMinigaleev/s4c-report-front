import { UserCreditionals } from "../api/auth/UserCreditionals";

export interface User{
  creditionals: UserCreditionals;
  developerPageUrl: string,
  rsyaAuthorizationToken: string;
}