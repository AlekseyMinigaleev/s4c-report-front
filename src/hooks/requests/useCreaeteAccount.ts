import { authorizedApi } from "../../api/authorizedApi";
import { UserCreditionals } from "../../models/UserCreditionals";

export interface CreateAccountPayload {
  credentionals: UserCreditionals;
  developerPageUrl: string;
  rsyaAuthorizationToken: string;
}

export interface ErrorMessages {
  login: string[];
  developerPageUrl: string[];
  rsyaAuthorizationToken: string[];
}

export const DEFAULT_ERROR_MESSAGES: ErrorMessages = {
  login: [],
  developerPageUrl: [],
  rsyaAuthorizationToken: [],
};

export default function useCreateAccount() {
  async function createAccount(
    payload: CreateAccountPayload
  ): Promise<ErrorMessages> {
    const response = await authorizedApi.post(
      "authentication/createAccount",
      JSON.stringify(payload),
      {
        withCredentials: true,
      }
    );

    const errorMessages: ErrorMessages = {
      login: response.data?.login || [],
      developerPageUrl: response.data?.developerPageUrl || [],
      rsyaAuthorizationToken: response?.data.rsyaAuthorizationToken || [],
    };
    return errorMessages;
  }

  return createAccount;
}
