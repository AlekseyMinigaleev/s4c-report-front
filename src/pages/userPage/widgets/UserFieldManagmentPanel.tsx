import { ReactNode } from "react";
import classes from "./userFieldManagmentPanel.module.css";

export interface userSettingsRowProps {
  settingFieldName?: string;
  children: ReactNode;
}

export default function UserSetttingsRow(
  props: userSettingsRowProps
) {
  return (
    <div className={classes["container"]}>
      <div className={classes["label-container"]}>
        <label>{props.settingFieldName}</label>
      </div>
      <div className={classes["content-container"]}>{props.children}</div>
    </div>
  );
}
