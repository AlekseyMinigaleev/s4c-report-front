import React, { useState } from "react";
import InputField from "../InputField/InputField";
import classes from "./Form.module.css";
import Button from "../Button/Button";
import { ICreateAccountPayload } from "../../../models/auth/ICreateAccountPayload";

export default function SignUpForm() {
  const [formState, setFormState] = useState<ICreateAccountPayload>();
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);
  return (
    <form>
      <InputField
        type="email"
        required={true}
        placeholderText="Почта"
        onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        isValid={false}
        errorMessage={""}
      />

      <InputField
        type="text"
        required={true}
        placeholderText="Ссылка на страницу разработчика"
        onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        isValid={false}
        errorMessage={""}
      />

      <InputField
        type="text"
        required={false}
        placeholderText="Токен авторизации РСЯ"
        onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        isValid={false}
        errorMessage={""}
      />

      <InputField
        type="password"
        required={true}
        placeholderText="Пароль"
        onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        isValid={false}
        errorMessage={""}
      />

      <InputField
        type="password"
        required={true}
        placeholderText="повтор пароля"
        onChange={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        isValid={false}
        errorMessage={""}
      />

      <Button onClick={() => console.log()} isActive={false}>
        Зарегестрироваться
      </Button>
    </form>
  );
}
