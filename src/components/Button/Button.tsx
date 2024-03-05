import { ReactNode } from "react";
import classes from "./button.module.css";

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  isActive: boolean;
  disabled?: boolean;

  className?: string;
}

export default function Button(props: ButtonProps) {
  const activeClass = `${props.isActive ? `${classes.button} ${classes.active}` : `${classes.button}`}`
  const className = `${props.className}`;
  return (
    <button
      className={`${className} ${activeClass} `}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
