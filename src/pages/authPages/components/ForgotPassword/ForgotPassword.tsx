import formclasses from "../../widgets/form.module.css";
import classes from "./forgotPassword.module.css";

export default function ForgotPassword() {
  return (
    <>
      <div className={`${formclasses["section"]}`}>
      <label className={classes["forgot-passport-label"]}>
        Забыли логин или пароль?
      </label>
      <a href="http://localhost:3000/auth"> Восстановить</a>
      </div>
    </>
  );
}
