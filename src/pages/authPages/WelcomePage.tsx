import React, { useState } from "react";
import classes from "./AuthPages.module.css";
import Button from "../../components/auth/Button/Button";
import LogInForm from "../../components/auth/Forms/LogInForm";
import SignUpForm from "../../components/auth/Forms/SignUpForm";

type FromVariant = "LogIn" | "SignUp";

export default function WelcomePage() {
  const [formVariant, setFormVaiant] = useState<FromVariant>("LogIn");

  return (
    <div className={"center"}>
      <div className={`${classes["form-container"]}`}>
        <div className={`${classes["input-container"]}`}>
          <Button
            onClick={() => setFormVaiant("LogIn")}
            isActive={formVariant == "LogIn"}
          >
            Вход
          </Button>
          <Button
            onClick={() => setFormVaiant("SignUp")}
            isActive={formVariant == "SignUp"}
          >
            Регистарция
          </Button>
        </div>

        {formVariant == "LogIn" ? <LogInForm /> : <SignUpForm />}
      </div>
    </div>
  );
}
