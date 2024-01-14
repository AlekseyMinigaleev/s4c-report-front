import React, { useContext, useState } from "react";
import InputField from "../../components/InputField/InputField";
import classes from "./Form.module.css";
import Button from "../../components/Button/Button";
import { validateLogin, validatePassword } from "../helpers/validations";
import { useFormField } from "../../../../hooks/useFormField";
import AuthContext from "../../../../context/AuthProvider";
import { Login, LoginPayload, LoginResponse } from "../../../../api/auth/Login";
import ErrorMessage from "../../components/ErrorMessaage/ErrorMessage";

export default function LogInForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");

  const email = useFormField<string>("", validateLogin);
  const password = useFormField<string>("", validatePassword);

  const authContext = useContext(AuthContext);

  async function handleLogin() {
    setIsLoading(true);

    const response = await executeLogin();

    handleResponse(response);

    setIsLoading(false);
  }

  async function executeLogin(): Promise<string | LoginResponse> {
    let payload: LoginPayload = {
      userCreditionals: {
        login: email.value,
        password: password.value,
      },
    };
    const result = await Login(payload);

    return result;
  }

  function handleResponse(response: string | LoginResponse) {
    if (typeof response == "string") {
      setServerErrorMessage(response);
    } else {
      authContext.setAuth({
        accessToken: response.jwtToken,
        refreshToken: "",
      });

      setServerErrorMessage("");
    }
  }

  let isValidFormForRequest =
    validateLogin(email.value) && validatePassword(password.value);

  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate>
      <InputField
        type="text"
        placeholderText="Почта"
        required={true}
        onChange={email.handleChange}
        isValid={email.isValid}
        errorMessage={"Некорректный формат электронной почты"}
      />
      <InputField
        type="password"
        placeholderText="Пароль"
        required={true}
        onChange={password.handleChange}
        isValid={password.isValid}
        errorMessage={
          "Минимальная длина пароля - 8 символов, пароль должен содержать хотя бы одну: заглавную букву, строчную букву, цифру"
        }
      />
      <div className={`${classes["forgor-password-section"]}`}>
        <label>Забыли пароль?</label>
        <button>Восстановить</button>
      </div>
      <Button
        onClick={handleLogin}
        isActive={isValidFormForRequest}
        disabled={!isValidFormForRequest || isLoading}
      >
        {isLoading ? "Загрузка..." : "войти"}
      </Button>

      {serverErrorMessage == "" ? null : (
        <div style={{ marginTop: "1rem" }}>
          <ErrorMessage text={serverErrorMessage} />
        </div>
      )}
    </form>
  );
}
