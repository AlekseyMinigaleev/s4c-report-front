import classes from "./staticFieldText.module.css";

export interface staticFieldTextProps {
  fieldValue: string;
  description: string;
}

export default function StaticFieldText(props: staticFieldTextProps) {
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
