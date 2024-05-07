import { ReactNode } from "react";
import classes from "./ManagmentPanel.module.css";

export interface managmentPanelProps {
  settingFieldName?: string;
  children: ReactNode;
}

export default function ManagmentPanel(
  props: managmentPanelProps
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
