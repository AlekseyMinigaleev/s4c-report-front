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
  rsyaAyuthorizationToken: string;
  repeatPassword: string;
}

interface ServerErrorMessages {
  login: string[];
  developerPageUrl: string[];
  rsyaAuthorizationToken: string[];
}

export default function SignUpForm() {
  const [formState, setFormState] = useState<SignUpFormFields>({
    creditionals: {
      login: "",
      password: "",
    },
    developerPageUrl: "",
    rsyaAyuthorizationToken: "",
    repeatPassword: "",
  });
  const [serverErrorMessages, setServerErrorMessages] =
    useState<ServerErrorMessages>({
      login: [],
      developerPageUrl: [],
      rsyaAuthorizationToken: [],
    });

  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isValidDeveloperPageUrl, setIsValidDeveloperPageUrl] =
    useState<boolean>(true);
  const [isValidRsyaAyuthorizationToken, setIsValidRsyaAyuthorizationToken] =
    useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  const [isValidPasswordRepeat, setIsValidRepeatPassword] =
    useState<boolean>(true);

  function validateRepeatPassword(repeatPassword: string): boolean {
    return formState.creditionals.password === repeatPassword;
  }
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
  function getEmailErrorMessage(): string {
    let defaultErrorMessage = "Некорректный формат электронной почты";
    let result = "";
    if (serverErrorMessages.login.length == 0) {
      result = defaultErrorMessage;
    } else {
      result = serverErrorMessages.login[0];
    }

    return result;
  }
  function getDeveloperPageUrlErrorMessage(): string {
    let defaultErrorMessage =
      "Указана не корректная ссылка на страницу разработчика";
    let result = "";
    if (serverErrorMessages.developerPageUrl.length == 0) {
      result = defaultErrorMessage;
    } else {
      result = serverErrorMessages.developerPageUrl[0];
    }

    return result;
  }
  function getRsyaAuthorizationTokenErrorMessage(): string {
    let defaultErrorMessage = "Указан неверный токен авторизации";
    let result = "";
    if (serverErrorMessages.rsyaAuthorizationToken.length == 0) {
      result = defaultErrorMessage;
    } else {
      result = serverErrorMessages.rsyaAuthorizationToken[0];
    }

    return result;
  }

  async function createAccount() {
    try {
      await axios.post(
        "Authentication/CreateAccount",
        JSON.stringify({
          credentionals: formState.creditionals,
          developerPageUrl: formState.developerPageUrl,
          rsyaAuthorizationToken: formState.rsyaAyuthorizationToken,
        })
      );
      setServerErrorMessages({
        login: [],
        developerPageUrl: [],
        rsyaAuthorizationToken: [],
      });
    } catch (error: any) {
      if (error.response && error.response.data) {
        const serverErrors: ServerErrorMessages = error.response.data;

        setServerErrorMessages({
          login: serverErrors.login || [],
          developerPageUrl: serverErrors.developerPageUrl || [],
          rsyaAuthorizationToken: serverErrors.rsyaAuthorizationToken || [],
        });

        setIsValidDeveloperPageUrl(serverErrors.developerPageUrl.length == 0);
        setIsValidEmail(serverErrors.login.length == 0);
        setIsValidRsyaAyuthorizationToken(
          serverErrors.rsyaAuthorizationToken.length == 0
        );
      }

      console.log(serverErrorMessages);
    }
  }
  let isValidFormForRequest =
    validateEmail(formState.creditionals.login) &&
    validatePassword(formState.creditionals.password) &&
    validateDeveloperPageUrl(formState.developerPageUrl) &&
    validateRsyaAuthorizationToken(formState.rsyaAyuthorizationToken) &&
    validateRepeatPassword(formState.repeatPassword)&&
    serverErrorMessages.developerPageUrl.length==0 &&
    serverErrorMessages.login.length==0 &&
    serverErrorMessages.rsyaAuthorizationToken.length==0;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <InputField
        type="email"
        required={true}
        placeholderText="Почта"
        onChange={(email: string) => {
          setFormState((prev) => ({
            ...prev,
            creditionals: { ...prev.creditionals, login: email },
          }));

          setIsValidEmail(validateEmail(email));
        }}
        isValid={isValidEmail}
        errorMessage={getEmailErrorMessage()}
      />

      <InputField
        type="text"
        required={true}
        placeholderText="Ссылка на страницу разработчика"
        onChange={(developerPageUrl: string) => {
          setFormState({
            ...formState,
            developerPageUrl: developerPageUrl,
          });

          setIsValidDeveloperPageUrl(
            validateDeveloperPageUrl(developerPageUrl)
          );
        }}
        isValid={isValidDeveloperPageUrl}
        errorMessage={getDeveloperPageUrlErrorMessage()}
      />

      <InputField
        type="text"
        required={false}
        placeholderText="Токен авторизации РСЯ"
        onChange={(rsyaAyuthorizationToken: string) => {
          setFormState({
            ...formState,
            rsyaAyuthorizationToken: rsyaAyuthorizationToken,
          });

          setIsValidRsyaAyuthorizationToken(
            validateRsyaAuthorizationToken(rsyaAyuthorizationToken)
          );
        }}
        isValid={isValidRsyaAyuthorizationToken}
        errorMessage={getRsyaAuthorizationTokenErrorMessage()}
      />

      <InputField
        type="password"
        required={true}
        placeholderText="Пароль"
        onChange={(password: string) => {
          setFormState((prev) => ({
            ...prev,
            creditionals: { ...prev.creditionals, password: password },
          }));

          setIsValidPassword(validatePassword(password));
        }}
        isValid={isValidPassword}
        errorMessage={
          "Минимальная длина пароля - 8 символов, пароль должен содержать хотя бы одну: заглавную букву, строчную букву, цифру"
        }
      />

      <InputField
        type="password"
        required={true}
        placeholderText="повтор пароля"
        onChange={(repeatPassword: string) => {
          setFormState({
            ...formState,
            repeatPassword: repeatPassword,
          });

          setIsValidRepeatPassword(validateRepeatPassword(repeatPassword));
        }}
        isValid={isValidPasswordRepeat}
        errorMessage={"Пароли не совпадают"}
      />
      <Button
        onClick={createAccount}
        isActive={isValidFormForRequest}
        disabled={!isValidFormForRequest}
      >
        создать аккаунт
      </Button>
    </form>
  );
}
