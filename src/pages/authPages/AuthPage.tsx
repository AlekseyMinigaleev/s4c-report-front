import { useState } from "react";
import classes from "../authPages/AuthPages.module.css";
import Button from "../../components/Button/Button";
import LogInForm from "./widgets/LogIn-form";
import SignUpForm from "./widgets/SignUp-form";
import AuthPageContainer from "./components/AuthPageContainer/AuthPageContainer";

type FromVariant = "LogIn" | "SignUp";

export default function AuthPage() {
  const [formVariant, setFormVaiant] = useState<FromVariant>("LogIn");

  return (
    <AuthPageContainer>
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
          Регистрация
        </Button>
      </div>

      {formVariant == "LogIn" ? <LogInForm /> : <SignUpForm />}
    </AuthPageContainer>
  );
}
