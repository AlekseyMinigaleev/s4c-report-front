import classes from "./ErrorMessage.module.css";

interface ErrorMessaageProps {
  text: string;
}

export default function ErrorMessage(props: ErrorMessaageProps) {
  return (
    <>
      <span className={classes["span"]}>{props.text}</span>
    </>
  );
}
