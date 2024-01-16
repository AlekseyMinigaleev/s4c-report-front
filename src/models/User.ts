import { UserCreditionals } from "../api/auth/models/UserCreditionals";

export interface User{
  creditionals: UserCreditionals;
  developerPageUrl: string,
  rsyaAuthorizationToken: string;
}