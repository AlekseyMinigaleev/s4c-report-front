import { useContext, useState } from "react";
import ValidatedInputField from "../../../components/validatedInputField/ValidatedInputField";
import Button from "../../../components/button/Button";
import {
  validateEmail,
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
import { BarLoader } from "react-spinners";
import useLogin, { LoginPayload } from "hooks/requests/useLogin";
import AuthContext from "../../../context/AuthProvider";
import { routeType } from "models/routeType";
import { useNavigate } from "react-router-dom";
import classes from "./form.module.css";
import { DEFAULT_USER_FIELDS_ERROR_MESSAGES } from "utils/constants";

export default function SignUpForm() {
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>(
    DEFAULT_ERROR_MESSAGES
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const email = useFormField<string>("", validateEmail);
  const password = useFormField<string>("", validatePassword);
  const developerPageUrl = useFormField<string>("", validateDeveloperPageUrl);
  const rsyaAuthorizationToken = useFormField<string>(
    "",
    validateRsyaAuthorizationToken
  );
  const repeatPassword = useFormField<string>("", validateRepeatPassword);

  const createAccount = useCreateAccount();
  const login = useLogin();

  const authContext = useContext(AuthContext);

  const navigate = useNavigate();

  async function handleCreateAccount() {
    const payload: CreateAccountPayload = {
      credentionals: {
        login: email.value,
        password: password.value,
      },
      developerPageUrl: developerPageUrl.value,
      rsyaAuthorizationToken: rsyaAuthorizationToken.value,
    };

    setIsLoading(true);
    const errorMessages = await createAccount(payload);

    setErrorMessages(errorMessages);
    setValidationStates(errorMessages);
    if (
      errorMessages.developerPageUrl.length == 0 &&
      errorMessages.login.length == 0 &&
      errorMessages.rsyaAuthorizationToken.length == 0
    ) {
      const payload: LoginPayload = {
        userCreditionals: {
          login: email.value,
          password: password.value,
        },
      };
      const response = await login(payload);

      authContext.setAuth({
        accessToken: response.data.authorizationTokens.accessToken,
      });
      localStorage.setItem(
        "developerInfo",
        JSON.stringify(response.data.developerInfo)
      );
      navigate(`/${routeType[routeType.games]}`);
      alert("Аккаунт успешно создан");
    }

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
    validateEmail(email.value) &&
    validatePassword(password.value) &&
    validateDeveloperPageUrl(developerPageUrl.value) &&
    validateRsyaAuthorizationToken(rsyaAuthorizationToken.value) &&
    validateRepeatPassword(repeatPassword.value, password.value);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <ValidatedInputField
          type="email"
          required={true}
          placeholderText="Почта"
          onChange={email.handleChange}
          isValid={email.isValid}
          errorMessage={getErrorMessage(
            DEFAULT_USER_FIELDS_ERROR_MESSAGES.email,
            errorMessages.login
          )}
          inputContainerClasses={classes["section"]}
          value={email.value}
        />

        <ValidatedInputField
          type="text"
          required={true}
          placeholderText="Ссылка на страницу разработчика"
          onChange={developerPageUrl.handleChange}
          isValid={developerPageUrl.isValid}
          errorMessage={getErrorMessage(
            DEFAULT_USER_FIELDS_ERROR_MESSAGES.developerPageUrl,
            errorMessages.developerPageUrl
          )}
          inputContainerClasses={classes["section"]}
          value={developerPageUrl.value}
        />

        <ValidatedInputField
          type="text"
          required={false}
          placeholderText="Токен авторизации РСЯ"
          onChange={rsyaAuthorizationToken.handleChange}
          isValid={rsyaAuthorizationToken.isValid}
          errorMessage={getErrorMessage(
            DEFAULT_USER_FIELDS_ERROR_MESSAGES.rsyaAuthorizationToken,
            errorMessages.rsyaAuthorizationToken
          )}
          inputContainerClasses={classes["section"]}
          value={rsyaAuthorizationToken.value}
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
          inputContainerClasses={classes["section"]}
          value={password.value}
        />

        <ValidatedInputField
          type="password"
          required={true}
          placeholderText="повтор пароля"
          onChange={repeatPassword.handleChange}
          isValid={validateRepeatPassword(repeatPassword.value, password.value)}
          errorMessage={"Пароли не совпадают"}
          inputContainerClasses={classes["section"]}
          value={repeatPassword.value}
        />
        <Button
          onClick={handleCreateAccount}
          isActive={isValidFormForRequest}
          disabled={!isValidFormForRequest || isLoading}
        >
          {isLoading ? <BarLoader color="white" /> : "Cоздать аккаунт"}
        </Button>
      </form>
    </>
  );
}
