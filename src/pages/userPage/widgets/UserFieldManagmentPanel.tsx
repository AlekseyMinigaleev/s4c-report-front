import { ReactNode } from "react";
import classes from "./userFieldManagmentPanel.module.css";

export interface userFieldManagmentPanelProps {
  fieldName?: string;
  children: ReactNode;
}

export default function UserFieldManagmentPanel(
  props: userFieldManagmentPanelProps
) {
  return (
    <div className={classes["container"]}>
      <div className={classes["label-container"]}>
        <label>{props.fieldName}</label>
      </div>
      <div className={classes["content-container"]}>{props.children}</div>
    </div>
  );
}
