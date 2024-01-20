import React, { ReactNode } from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  isActive: boolean;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      className={
        props.isActive
          ? `${classes.button} ${classes.active}`
          : `${classes.button}`
      }
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
