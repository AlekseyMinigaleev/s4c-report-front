import { useContext, useState } from "react";
import InputField from "./InputField/InputField";
import Button from "../../../components/Button/Button";
import { validateLogin, validatePassword } from "../helpers/validations";
import { useFormField } from "../../../hooks/useFormField";
import AuthContext from "../../../context/AuthProvider";
import ErrorMessage from "./ErrorMessaage/ErrorMessage";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import useLogin, {
  LoginPayload,
  LoginResponse,
} from "../../../hooks/requests/useLogin";
import useLoading from "../../../hooks/useLoading";
import RememberMe from "./RememberMe/RememberMe";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import classes from "./Form.module.css";

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
  }

  function handleLoginResponse(response: AxiosResponse<LoginResponse, any>) {
    if (response.status == 400) {
      let data = response.data as any;
      setServerErrorMessage(data.NotFound[0]); // TODO: читать все ошибки а не только первую.
    } else if (response.status == 200) {
      authContext.setAuth({
        accessToken: response.data.authorizationTokens.accessToken,
      });
      localStorage.setItem(
        "developerInfo",
        JSON.stringify(response.data.developerInfo)
      );
      setServerErrorMessage("");
      navigate("/welcome");
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

      <RememberMe />

      <Button
        onClick={handleLogin}
        isActive={isValidFormForRequest}
        disabled={!isValidFormForRequest || isLoading}
      >
        {isLoading ? "Загрузка..." : "войти"}
      </Button>

      {serverErrorMessage == "" ? null : (
        <>
          <div className={classes["section"]}>
            <ErrorMessage text={serverErrorMessage} />
          </div>
          <ForgotPassword />
        </>
      )}
    </form>
  );
}
