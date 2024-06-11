import React, { ReactNode } from "react";
import classes from "../../AuthPages.module.css";

export interface AuthPageContainerProps{
  children: ReactNode,
}

export default function AuthPageContainer(props:AuthPageContainerProps) {
  return (
    <>
      <div className={classes["center"]}>
        <div
          className={`${classes["auth-page-font"]}  ${classes["form-container"]}`}
        >
          {props.children}
        </div>
      </div>
    </>
  );
}
