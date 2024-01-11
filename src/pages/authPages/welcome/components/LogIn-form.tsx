import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import classes from "./Form.module.css";
import Button from "../../components/Button/Button";
import {
  validateLogin,
  validatePassword,
} from "../../../../models/auth/IUserCreditionals";
import { UserCreditionals } from "../../../../api/auth/UserCreditionals";

export default function LogInForm() {
  const [formState, setFormState] = useState<UserCreditionals>({
    login: "",
    password: "",
  });
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);

  function submit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  let isValidForm =
    validateLogin(formState.login) && validatePassword(formState.password);

  return (
    <form onSubmit={submit} noValidate>
      <InputField
        type="text"
        placeholderText="Почта"
        required={true}
        onChange={(email) => {
          setFormState({
            ...formState,
            login: email,
          });
          setIsValidEmail(validateLogin(email));
        }}
        isValid={isValidEmail}
        errorMessage={"Некорректный формат электронной почты"}
      />
      <InputField
        type="password"
        placeholderText="Пароль"
        required={true}
        onChange={(password) => {
          setFormState({
            ...formState,
            password: password,
          });
          setIsValidPassword(validatePassword(password));
        }}
        isValid={isValidPassword}
        errorMessage={
          "Минимальная длина пароля - 8 символов, пароль должен содержать хотя бы одну: заглавную букву, строчную букву, цифру"
        }
      />
      <div className={`${classes["forgor-password-section"]}`}>
        <label>Забыли пароль?</label>
        <button>Восстановить</button>
      </div>
      <Button
        onClick={() => console.log}
        isActive={isValidForm}
        disabled={!isValidForm}
      >
        Войти
      </Button>
    </form>
  );
}
