import React, { useContext, useState } from "react";
import InputField from "./InputField/InputField";
import classes from "./Form.module.css";
import Button from "../../../components/Button/Button";
import { validateLogin, validatePassword } from "../helpers/validations";
import { useFormField } from "../../../hooks/useFormField";
import AuthContext from "../../../context/AuthProvider";
import ErrorMessage from "./ErrorMessaage/ErrorMessage";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { AuthenticationTokens } from "../../../models/AuthenticationTokens";
import useLogin, { LoginPayload } from "../../../hooks/requests/useLogin";
import useLoading from "../../../hooks/useLoading";

export default function LogInForm() {
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");

  const email = useFormField<string>("", validateLogin);
  const password = useFormField<string>("", validatePassword);

  const authContext = useContext(AuthContext);

  const { isLoading, executeRequest } = useLoading(useLogin);

  const navigate = useNavigate();

  async function handleLogin() {
    let payload: LoginPayload = {
      userCreditionals: {
        login: email.value,
        password: password.value,
      },
    };
    const response = await executeRequest(payload);

    handleLoginResponse(response);

    if (response.status == 200) {
      navigate("/welcome");
    }
  }

  function handleLoginResponse(
    response: AxiosResponse<AuthenticationTokens, any>
  ) {
    if (response.status == 400) {
      let data = response.data as any;
      setServerErrorMessage(data.NotFound[0]);
    } else if (response.status == 200) {
      console.log(response.data);

      authContext.setAuth({
        accessToken: response.data.accessToken,
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
