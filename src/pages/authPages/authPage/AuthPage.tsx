import { useState } from "react";
import classes from "../AuthPages.module.css";
import Button from "../../../components/Button/Button";
import LogInForm from "../components/LogIn-form";
import SignUpForm from "../components/SignUp-form";

type FromVariant = "LogIn" | "SignUp";

export default function AuthPage() {
  const [formVariant, setFormVaiant] = useState<FromVariant>("LogIn");

  return (
    <div className={classes["center"]}>
      <div className={`${classes["auth-page-font"]}  ${classes["form-container"]}`}>
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
