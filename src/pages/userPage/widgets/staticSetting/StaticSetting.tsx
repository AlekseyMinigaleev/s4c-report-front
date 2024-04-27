import classes from "./staticSetting.module.css";

export interface staticSettingProps {
  fieldValue: string;
  description: string;
}

export default function StaticSetting(props: staticSettingProps) {
  return (
    <>
      <div className={classes["developer-page-link"]}>
        <a className="link-color" href={props.fieldValue}>
          {props.fieldValue}
        </a>
      </div>
      <div>
        <p>{props.description}</p>
      </div>
    </>
  );
}
