import React, { useContext, useState } from "react";
import InputField from "./InputField/InputField";
import Button from "./Button/Button";
import {
  validateLogin,
  validateDeveloperPageUrl,
  validateRsyaAuthorizationToken,
  validatePassword,
  validateRepeatPassword,
} from "../helpers/validations";
import { useFormField } from "../../../hooks/useFormField";
import { getErrorMessage } from "../helpers/utils";
import AuthContext from "../../../context/AuthProvider";
import useCreateAccount, { CreateAccountPayload, DEFAULT_ERROR_MESSAGES, ErrorMessages } from "../../../hooks/requests/useCreaeteAccount";

const defaultErrorMessages = {
  email: "Некорректный формат электронной почты",
  developerPageUrl: "Указана не корректная ссылка на страницу разработчика",
  rsyaAuthorizationToken: "Указан неверный токен авторизации",
};

export default function SignUpForm() {
  const authContext = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>(
    DEFAULT_ERROR_MESSAGES
  );

  const email = useFormField<string>("", validateLogin);
  const password = useFormField<string>("", validatePassword);
  const developerPageUrl = useFormField<string>("", validateDeveloperPageUrl);
  const rsyaAuthorizationToken = useFormField<string>(
    "",
    validateRsyaAuthorizationToken
  );
  const repeatPassword = useFormField<string>("", validateRepeatPassword);

  const createAccount = useCreateAccount();

  async function handleCreateAccount() {
    setIsLoading(true);
    const payload: CreateAccountPayload = {
      credentionals: {
        login: email.value,
        password: password.value,
      },
      developerPageUrl: developerPageUrl.value,
      rsyaAuthorizationToken: rsyaAuthorizationToken.value,
    };

    const errorMessages = await createAccount(payload);

    setErrorMessages(errorMessages);

    setValidationStates(errorMessages);

    setIsLoading(false);
  }

  function setValidationStates(errorMessages: ErrorMessages) {
    email.setIsValid(errorMessages.login.length == 0);
    developerPageUrl.setIsValid(errorMessages.developerPageUrl.length == 0);
    rsyaAuthorizationToken.setIsValid(
      errorMessages.rsyaAuthorizationToken.length == 0
    );
  }

  let isValidFormForRequest =
    validateLogin(email.value) &&
    validatePassword(password.value) &&
    validateDeveloperPageUrl(developerPageUrl.value) &&
    validateRsyaAuthorizationToken(rsyaAuthorizationToken.value) &&
    validateRepeatPassword(repeatPassword.value, password.value);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <InputField
        type="email"
        required={true}
        placeholderText="Почта"
        onChange={email.handleChange}
        isValid={email.isValid}
        errorMessage={getErrorMessage(
          defaultErrorMessages.email,
          errorMessages.login
        )}
      />

      <InputField
        type="text"
        required={true}
        placeholderText="Ссылка на страницу разработчика"
        onChange={developerPageUrl.handleChange}
        isValid={developerPageUrl.isValid}
        errorMessage={getErrorMessage(
          defaultErrorMessages.developerPageUrl,
          errorMessages.developerPageUrl
        )}
      />

      <InputField
        type="text"
        required={false}
        placeholderText="Токен авторизации РСЯ"
        onChange={rsyaAuthorizationToken.handleChange}
        isValid={rsyaAuthorizationToken.isValid}
        errorMessage={getErrorMessage(
          defaultErrorMessages.rsyaAuthorizationToken,
          errorMessages.rsyaAuthorizationToken
        )}
      />

      <InputField
        type="password"
        required={true}
        placeholderText="Пароль"
        onChange={password.handleChange}
        isValid={password.isValid}
        errorMessage={
          "Минимальная длина пароля - 8 символов, пароль должен содержать хотя бы одну: заглавную букву, строчную букву, цифру"
        }
      />

      <InputField
        type="password"
        required={true}
        placeholderText="повтор пароля"
        onChange={repeatPassword.handleChange}
        isValid={validateRepeatPassword(repeatPassword.value, password.value)}
        errorMessage={"Пароли не совпадают"}
      />
      <Button
        onClick={handleCreateAccount}
        isActive={isValidFormForRequest}
        disabled={!isValidFormForRequest || isLoading}
      >
        {isLoading ? "Загрузка..." : "создать аккаунт"}
      </Button>
    </form>
  );
}
