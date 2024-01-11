import axios from "../axios";
import { UserCreditionals } from "./UserCreditionals";

export interface CreateAccountPayload {
  credentionals: UserCreditionals;
  developerPageUrl: string;
  rsyaAuthorizationToken: string;
}

export interface Response {
  statusCode: number;
  errorMessages: ErrorMessages;
}

export interface ErrorMessages {
  login: string[];
  developerPageUrl: string[];
  rsyaAuthorizationToken: string[];
}

export const DefaultErrorMessagesState: ErrorMessages = {
  login: [],
  developerPageUrl: [],
  rsyaAuthorizationToken: [],
};

export async function createAccount(
  payload: CreateAccountPayload
): Promise<Response> {
  let result: Response = {
    statusCode: 123,
    errorMessages: DefaultErrorMessagesState,
  };
  await axios
    .post("authentication/createAccount", JSON.stringify(payload))
    .then((response) => {
      result = {
        statusCode: response.status,
        errorMessages: DefaultErrorMessagesState,
      };
    })
    .catch((error) => {
      console.log(`error: ${error}`);
      result = {
        statusCode: error.response.status,
        errorMessages: {
          login: error.response.data?.login || [],
          developerPageUrl: error.response.data?.developerPageUrl || [],
          rsyaAuthorizationToken:
            error.response?.data.rsyaAuthorizationToken || [],
        },
      };
    });
  return result;
}
