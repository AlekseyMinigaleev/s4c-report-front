import { useContext, useState } from "react";
import ValidatedInputField from "../components/validatedInputField/ValidatedInputField";
import Button from "../../../components/button/Button";
import { validateLogin, validatePassword } from "../helpers/validations";
import { useFormField } from "../../../hooks/useFormField";
import AuthContext from "../../../context/AuthProvider";
import ErrorMessage from "../components/errorMessaage/ErrorMessage";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import useLogin, {
  LoginPayload,
  LoginResponse,
} from "../../../hooks/requests/useLogin";
import useLoading from "../../../hooks/useLoading";
import RememberMe from "../components/rememberMe/RememberMe";
import ForgotPassword from "../components/forgotPassword/ForgotPassword";
import classes from "./form.module.css";
import { routeType } from "models/routeType";
import { BarLoader } from "react-spinners";

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
      navigate(`/${routeType[routeType.games]}`);
    }
  }

  let isValidFormForRequest =
    validateLogin(email.value) && validatePassword(password.value);

  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate>
      <ValidatedInputField
        type="text"
        placeholderText="Почта"
        required={true}
        onChange={email.handleChange}
        isValid={email.isValid}
        errorMessage={"Некорректный формат электронной почты"}
      />

      <ValidatedInputField
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
        {isLoading ? <BarLoader color="white" /> : "Вход"}
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
