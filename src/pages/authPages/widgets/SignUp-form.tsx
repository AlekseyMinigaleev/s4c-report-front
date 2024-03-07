import React, { useContext, useState } from "react";
import ValidatedInputField from "../components/validatedInputField/ValidatedInputField";
import Button from "../../../components/button/Button";
import {
  validateLogin,
  validateDeveloperPageUrl,
  validateRsyaAuthorizationToken,
  validatePassword,
  validateRepeatPassword,
} from "../helpers/validations";
import { useFormField } from "../../../hooks/useFormField";
import { getErrorMessage } from "../helpers/utils";
import useCreateAccount, {
  CreateAccountPayload,
  DEFAULT_ERROR_MESSAGES,
  ErrorMessages,
} from "../../../hooks/requests/useCreaeteAccount";
import useLoading from "../../../hooks/useLoading";

const defaultErrorMessages = {
  email: "Некорректный формат электронной почты",
  developerPageUrl: "Указана не корректная ссылка на страницу разработчика",
  rsyaAuthorizationToken: "Указан неверный токен авторизации",
};

export default function SignUpForm() {
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

  const { isLoading, executeRequest } = useLoading(useCreateAccount);

  async function handleCreateAccount() {
    const payload: CreateAccountPayload = {
      credentionals: {
        login: email.value,
        password: password.value,
      },
      developerPageUrl: developerPageUrl.value,
      rsyaAuthorizationToken: rsyaAuthorizationToken.value,
    };

    const errorMessages = await executeRequest(payload);

    setErrorMessages(errorMessages);

    setValidationStates(errorMessages);
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
      <ValidatedInputField
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

      <ValidatedInputField
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

      <ValidatedInputField
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

      <ValidatedInputField
        type="password"
        required={true}
        placeholderText="Пароль"
        onChange={password.handleChange}
        isValid={password.isValid}
        errorMessage={
          "Минимальная длина пароля - 8 символов, пароль должен содержать хотя бы одну: заглавную букву, строчную букву, цифру"
        }
      />

      <ValidatedInputField
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