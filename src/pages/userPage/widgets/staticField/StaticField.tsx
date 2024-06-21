import { ReactNode } from "react";
import classes from "./staticField.module.css";

export interface staticFieldProps {
  fieldValue: ReactNode;
  description: string;
}

export default function StaticField(props: staticFieldProps) {
  return (
    <>
      <div className={classes["developer-page-link"]}>
        {props.fieldValue}
      </div>
      <div>
        <p>{props.description}</p>
      </div>
    </>
  );
}
