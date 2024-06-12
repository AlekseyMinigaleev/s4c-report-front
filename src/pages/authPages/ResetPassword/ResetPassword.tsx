import { useEffect, useState } from "react";
import AuthPageContainer from "../components/AuthPageContainer/AuthPageContainer";
import ValidatedInputField from "components/validatedInputField/ValidatedInputField";
import { useFormField } from "hooks/useFormField";
import {
  validatePassword,
  validateRepeatPassword,
} from "../helpers/validations";
import Button from "components/Button/Button";
import { BarLoader } from "react-spinners";
import classes from "./ResetPassword.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "components/errorMessaage/ErrorMessage";
import useResetPassword, {
  resetPasswordPayload,
} from "hooks/requests/useResetPassword";
import { routeType } from "models/routeType";

export default function ResetPassword() {
  const password = useFormField<string>("", validatePassword);
  const repeatPassword = useFormField<string>("", validateRepeatPassword);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      console.log(token);
    }
  }, [token]);

  const navigate = useNavigate();

  const resetPassword = useResetPassword();

  let isValidFormForRequest =
    validatePassword(password.value) &&
    validateRepeatPassword(repeatPassword.value, password.value);

  async function resetPasswordHandle() {
    setIsLoading(true);
    const payload: resetPasswordPayload = {
      password: password.value,
      resetPasswordToken: token as string,
    };

    const result = await resetPassword(payload);
    if (result === "") {
      setSuccessMessage("Пароль успешно сброшен");
    }
    {
      setServerErrorMessage(result);
    }

    setIsLoading(false);
  }

  function goToAuthPahe() {
    navigate(`/${routeType[routeType.auth]}`);
  }

  function goToSendResetPassword() {
    navigate(`/${routeType[routeType["send-reset-password"]]}`);
  }

  return (
    <AuthPageContainer>
      <h1>Сброс пароля</h1>

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
        labelText="Новый пароль"
      />

      <ValidatedInputField
        type="password"
        required={true}
        placeholderText="Повтор пароля"
        onChange={repeatPassword.handleChange}
        isValid={validateRepeatPassword(repeatPassword.value, password.value)}
        errorMessage={"Пароли не совпадают"}
        inputContainerClasses={classes["section"]}
        value={repeatPassword.value}
        labelText="Повтор пароля"
      />

      {successMessage == "" && serverErrorMessage == "" ? (
        <Button
          onClick={resetPasswordHandle}
          className={classes.button}
          isActive={isValidFormForRequest}
          disabled={!isValidFormForRequest}
        >
          {isLoading ? <BarLoader color="white" /> : "Сбросить пароль"}
        </Button>
      ) : successMessage != "" ? (
        <Button
          onClick={goToAuthPahe}
          className={classes.button}
          isActive={isValidFormForRequest}
          disabled={!isValidFormForRequest}
        >
          {isLoading ? (
            <BarLoader color="white" />
          ) : (
            "Перейти на страницу авторизации"
          )}
        </Button>
      ) : (
        <Button
          onClick={goToSendResetPassword}
          className={classes.button}
          isActive={isValidFormForRequest}
          disabled={!isValidFormForRequest}
        >
          {isLoading ? <BarLoader color="white" /> : "Получить новое письмо"}
        </Button>
      )}

      <div className={`${classes["section"]} ${classes["error-message"]}`}>
        <ErrorMessage text={serverErrorMessage} />
      </div>

      {successMessage && (
        <div className={`${classes["section"]} ${classes["success-message"]}`}>
          {successMessage}
        </div>
      )}
    </AuthPageContainer>
  );
}
