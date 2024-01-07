import { IUserCreditionals } from "./IUserCreditionals";

export interface ICreateAccountPayload {
  Creditionals: IUserCreditionals;
  DeveloperPageUrl: string;
  RsyaAyuthorizationToken: string;
}
