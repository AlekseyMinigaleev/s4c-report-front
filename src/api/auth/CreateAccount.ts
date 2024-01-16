import axios from "../axios";
import { UserCreditionals } from "./models/UserCreditionals";

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

export async function createAccount(
  payload: CreateAccountPayload
): Promise<ErrorMessages> {
  const response = await axios.post(
    "authentication/createAccount",
    JSON.stringify(payload)
  );

  const errorMessages: ErrorMessages = {
    login: response.data?.login || [],
    developerPageUrl: response.data?.developerPageUrl || [],
    rsyaAuthorizationToken: response?.data.rsyaAuthorizationToken || [],
  };

  return errorMessages;
}
