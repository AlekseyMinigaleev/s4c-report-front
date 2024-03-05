import { useContext, useEffect } from "react";
import AuthContext from "../../../../context/AuthProvider";
import formClasses from "../../widgets/form.module.css";
import classes from "./rememberMe.module.css";

export default function RememberMe() {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    localStorage.setItem("persist", `${authContext.isPersist}`);
  }, [authContext.isPersist]);

  return (
    <>
      <div className={formClasses["section"]}>
        <input
          className={classes["remember-me-checkbox"]}
          type={"checkbox"}
          id="persist"
          onChange={() => {
            authContext.setIsPersist((prev) => !prev);
          }}
          checked={authContext.isPersist}
        />
        <label className={classes["remember-me-label"]} htmlFor="persist">
          Запомнить это устройство
        </label>
      </div>
    </>
  );
}
