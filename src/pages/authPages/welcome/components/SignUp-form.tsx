import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import {
  validateLogin,
  validatePassword,
} from "../../../../models/auth/IUserCreditionals";
import {
  CreateAccountPayload,
  DefaultErrorMessagesState,
  ErrorMessages,
  createAccount,
} from "../../../../api/auth/CreateAccount";

interface FormFields {
  email: string;
  developerPageUrl: string;
  rsyaAuthorizationToken: string;
  password: string;
  repeatPassword: string;
}

interface FormValidationState {
  email: boolean;
  developerPageUrl: boolean;
  rsyaAuthorizationToken: boolean;
  password: boolean;
  repeatPassword: boolean;
}

type ValidationFieldsName =
  | "email"
  | "developerPageUrl"
  | "rsyaAuthorizationToken"
  | "password"
  | "repeatPassword";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<FormFields>({
    email: "",
    password: "",
    developerPageUrl: "",
    rsyaAuthorizationToken: "",
    repeatPassword: "",
  });

  const [validationState, setValidationState] = useState<FormValidationState>({
    email: true,
    developerPageUrl: true,
    rsyaAuthorizationToken: true,
    password: true,
    repeatPassword: true,
  });

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>(
    DefaultErrorMessagesState
  );

  const defaultErrorMessages = {
    email: "Некорректный формат электронной почты",
    developerPageUrl: "Указана не корректная ссылка на страницу разработчика",
    rsyaAuthorizationToken: "Указан неверный токен авторизации",
  };

  const fieldValidations: Record<string, (value: string) => boolean> = {
    email: validateLogin,
    developerPageUrl: validateDeveloperPageUrl,
    rsyaAuthorizationToken: validateRsyaAuthorizationToken,
    password: validatePassword,
    repeatPassword: validateRepeatPassword,
  };

  function validateDeveloperPageUrl(email: string): boolean {
    let pattern = "https://yandex.ru/games/developer?name=";
    return email.startsWith(pattern);
  }
  function validateRsyaAuthorizationToken(rsyaAuthorizationToken: string) {
    return (
      /^[a-zA-Z0-9_]+$/.test(rsyaAuthorizationToken) ||
      rsyaAuthorizationToken == ""
    );
  }
  function validateRepeatPassword(repeatPassword: string): boolean {
    return formState.password == repeatPassword;
  }

  function handleFieldChange(fieldName: ValidationFieldsName, value: string) {
    setFormState((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    setValidationState((prev) => ({
      ...prev,
      [fieldName]: fieldValidations[fieldName](value),
    }));
  }

  function getErrorMessage(
    defaultErrorMessage: string,
    errorMessages: string[]
  ): string {
    return errorMessages.length == 0 ? defaultErrorMessage : errorMessages[0];
  }

  async function executeCreateAccount() {
    setIsLoading(true);

    let payload: CreateAccountPayload = {
      credentionals: {
        login: formState.email,
        password: formState.password,
      },
      developerPageUrl: formState.developerPageUrl,
      rsyaAuthorizationToken: formState.rsyaAuthorizationToken,
    };

    let response = await createAccount(payload);

    if (response.statusCode == 200) {
      setValidationState({
        ...validationState,
        email: response.errorMessages.login.length == 0,
        developerPageUrl: response.errorMessages.developerPageUrl.length == 0,
        rsyaAuthorizationToken:
          response.errorMessages.rsyaAuthorizationToken.length == 0,
      });
      setIsLoading(false);

      return;
    }

    if (response.statusCode == 400) {
      if (response.errorMessages != null) {
        setErrorMessages(response.errorMessages);

        setValidationState({
          ...validationState,
          email: response.errorMessages.login.length == 0,
          developerPageUrl: response.errorMessages.developerPageUrl.length == 0,
          rsyaAuthorizationToken:
            response.errorMessages.rsyaAuthorizationToken.length == 0,
        });
      }
      setIsLoading(false);
      return;
    }
  }

  let isValidFormForRequest =
    validateLogin(formState.email) &&
    validatePassword(formState.password) &&
    validateDeveloperPageUrl(formState.developerPageUrl) &&
    validateRsyaAuthorizationToken(formState.rsyaAuthorizationToken) &&
    validateRepeatPassword(formState.repeatPassword);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <InputField
        type="email"
        required={true}
        placeholderText="Почта"
        onChange={(email: string) => handleFieldChange("email", email)}
        isValid={validationState.email}
        errorMessage={getErrorMessage(
          defaultErrorMessages.email,
          errorMessages.login
        )}
      />

      <InputField
        type="text"
        required={true}
        placeholderText="Ссылка на страницу разработчика"
        onChange={(developerPageUrl: string) =>
          handleFieldChange("developerPageUrl", developerPageUrl)
        }
        isValid={validationState.developerPageUrl}
        errorMessage={getErrorMessage(
          defaultErrorMessages.developerPageUrl,
          errorMessages.developerPageUrl
        )}
      />

      <InputField
        type="text"
        required={false}
        placeholderText="Токен авторизации РСЯ"
        onChange={(rsyaAyuthorizationToken: string) =>
          handleFieldChange("rsyaAuthorizationToken", rsyaAyuthorizationToken)
        }
        isValid={validationState.rsyaAuthorizationToken}
        errorMessage={getErrorMessage(
          defaultErrorMessages.rsyaAuthorizationToken,
          errorMessages.rsyaAuthorizationToken
        )}
      />

      <InputField
        type="password"
        required={true}
        placeholderText="Пароль"
        onChange={(password: string) => handleFieldChange("password", password)}
        isValid={validationState.password}
        errorMessage={
          "Минимальная длина пароля - 8 символов, пароль должен содержать хотя бы одну: заглавную букву, строчную букву, цифру"
        }
      />

      <InputField
        type="password"
        required={true}
        placeholderText="повтор пароля"
        onChange={(repeatPassword: string) => {
          handleFieldChange("repeatPassword", repeatPassword);
        }}
        isValid={validateRepeatPassword(formState.repeatPassword)}
        errorMessage={"Пароли не совпадают"}
      />
      <Button
        onClick={executeCreateAccount}
        isActive={isValidFormForRequest}
        disabled={!isValidFormForRequest || isLoading}
      >
        {isLoading ? "Загрузка..." : "создать аккаунт"}
      </Button>
    </form>
  );
}
