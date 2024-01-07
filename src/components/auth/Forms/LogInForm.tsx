import React, { useState } from "react";
import InputField from "../InputField/InputField";
import classes from "./Form.module.css";
import Button from "../Button/Button";
import {
  IUserCreditionals,
  validateEmail,
  validatePassword,
} from "../../../models/auth/IUserCreditionals";

export default function LogInForm() {
  const [formState, setFormState] = useState<IUserCreditionals>({
    email: "",
    password: "",
  });
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);

  function submit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  let isValidForm =
    validateEmail(formState.email) && validatePassword(formState.password);

  return (
    <form onSubmit={submit} noValidate>
      <InputField
        type="text"
        placeholderText="Почта"
        required={true}
        onChange={(email) => {
          setFormState({
            ...formState,
            email: email,
          });
          let isValid = validateEmail(email);
          setIsValidEmail(isValid);
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
          let isVlalid = validatePassword(password);
          setIsValidPassword(isVlalid);
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
