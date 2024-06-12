import ValidatedInputField from "components/validatedInputField/ValidatedInputField";
import AuthPageContainer from "../components/AuthPageContainer/AuthPageContainer";
import { useFormField } from "hooks/useFormField";
import { validateEmail } from "../helpers/validations";
import classes from ".//ResetPasswordPage.module.css";
import Button from "components/Button/Button";
import { BarLoader } from "react-spinners";
import ErrorMessage from "components/errorMessaage/ErrorMessage";
import { useState } from "react";
import useSendResetPassword from "hooks/requests/useSendResetPassword";

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const sendResetPassword = useSendResetPassword();

  const email = useFormField<string>("", validateEmail);

  async function onClick() {
    setIsLoading(true);
    const result = await sendResetPassword(email.value);

    if (!result) {
      setServerErrorMessage("Пользователь с указанной почтой не был найден");
      setSuccessMessage("");
    } else {
      setServerErrorMessage("");
      setSuccessMessage(
        "Письмо отправлено! Пожалуйста, проверьте вашу электронную почту."
      );
    }

    setIsLoading(false);
  }

  return (
    <AuthPageContainer>
      <h1>Восстановление пароля</h1>
      <p>
        Введите ваш адрес электронной почты, чтобы получить ссылку для
        восстановления пароля.
      </p>
      <p>
        На указанный адрес будет отправлено письмо с дальнейшими инструкциями по
        восстановлению пароля.
      </p>
      <div className={classes["container"]}>
        <ValidatedInputField
          type="text"
          placeholderText="E-mail"
          required={true}
          onChange={email.handleChange}
          isValid={email.isValid}
          errorMessage={"Некорректный формат электронной почты"}
          inputContainerClasses={classes["section"]}
          value={email.value}
          labelText={""}
        />

        <Button
          className={classes["button"]}
          onClick={onClick}
          isActive={email.isValid}
          disabled={!email.isValid || isLoading}
        >
          {isLoading ? <BarLoader color="white" width={"100%"}/> : "Отправить письмо"}
        </Button>

        {serverErrorMessage && (
          <div className={`${classes["section"]} ${classes["font-size"]}`}>
            <ErrorMessage text={serverErrorMessage} />
          </div>
        )}
        
        {successMessage && (
          <div className={`${classes["section"]} ${classes["success-message"]}`}>
            {successMessage}
          </div>
        )}
      </div>
    </AuthPageContainer>
  );
}