import React, { useState } from "react";
import InputField from "../InputField/InputField";
import classes from "./Form.module.css";
import Button from "../Button/Button";
import {
  IUserCreditionals,
  validateEmail,
  validatePassword,
} from "../../../models/auth/IUserCreditionals";
import axios from "../../../api/axios";

interface SignUpFormFields {
  creditionals: IUserCreditionals;
  developerPageUrl: string;
  rsyaAuthorizationToken: string;
  repeatPassword: string;
}

interface ValidationState {
  email: boolean;
  developerPageUrl: boolean;
  rsyaAuthorizationToken: boolean;
  password: boolean;
  repeatPassword: boolean;
}

interface ServerErrorMessages {
  login: string[];
  developerPageUrl: string[];
  rsyaAuthorizationToken: string[];
}

type ValidationFieldsName =
  | "email"
  | "developerPageUrl"
  | "rsyaAuthorizationToken"
  | "password"
  | "repeatPassword";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<SignUpFormFields>({
    creditionals: {
      login: "",
      password: "",
    },
    developerPageUrl: "",
    rsyaAuthorizationToken: "",
    repeatPassword: "",
  });

  const [validationState, setValidationState] = useState<ValidationState>({
    email: true,
    developerPageUrl: true,
    rsyaAuthorizationToken: true,
    password: true,
    repeatPassword: true,
  });

  const [serverErrorMessages, setServerErrorMessages] =
    useState<ServerErrorMessages>({
      login: [],
      developerPageUrl: [],
      rsyaAuthorizationToken: [],
    });

  const defaultErrorMessages = {
    email: "Некорректный формат электронной почты",
    developerPageUrl: "Указана не корректная ссылка на страницу разработчика",
    rsyaAuthorizationToken: "Указан неверный токен авторизации",
  };

  const fieldValidations: Record<string, (value: string) => boolean> = {
    email: validateEmail,
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
    return formState.creditionals.password == repeatPassword;
  }

  function handleFieldChange(fieldName: ValidationFieldsName, value: string) {
    if (fieldName == "password") {
      setFormState((prev) => ({
        ...prev,
        creditionals: { ...prev.creditionals, [fieldName]: value },
      }));
    } else if (fieldName == "email") {
      setFormState((prev) => ({
        ...prev,
        creditionals: { ...prev.creditionals, login: value },
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }

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

  function clearErrorMessages() {
    setServerErrorMessages({
      login: [],
      developerPageUrl: [],
      rsyaAuthorizationToken: [],
    });
  }

  async function createAccount() {
    try {
      setIsLoading(true);
      await axios.post(
        "Authentication/CreateAccount",
        JSON.stringify({
          credentionals: formState.creditionals,
          developerPageUrl: formState.developerPageUrl,
          rsyaAuthorizationToken: formState.rsyaAuthorizationToken,
        })
      );
      clearErrorMessages();
    } catch (error: any) {
      if (error.response && error.response.data) {
        const serverErrors: ServerErrorMessages = {
          login: error.response.data.login || [],
          developerPageUrl: error.response.data.developerPageUrl || [],
          rsyaAuthorizationToken:
            error.response.data.rsyaAuthorizationToken || [],
        };
        setServerErrorMessages(serverErrors);

        setValidationState({
          ...validationState,

          email: serverErrors.login.length == 0,
          developerPageUrl: serverErrors.developerPageUrl.length == 0,
          rsyaAuthorizationToken:
            serverErrors.rsyaAuthorizationToken.length == 0,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  let isValidFormForRequest =
    validateEmail(formState.creditionals.login) &&
    validatePassword(formState.creditionals.password) &&
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
          serverErrorMessages.login
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
          serverErrorMessages.developerPageUrl
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
          serverErrorMessages.rsyaAuthorizationToken
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
        onClick={createAccount}
        isActive={isValidFormForRequest}
        disabled={!isValidFormForRequest || isLoading}
      >
        {isLoading ? "Загрузка..." : "создать аккаунт"}
      </Button>
    </form>
  );
}
