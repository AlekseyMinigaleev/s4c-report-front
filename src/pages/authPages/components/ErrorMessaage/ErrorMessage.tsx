import "./ErrorMessage.module.css";
interface ErrorMessaageProps {
  text: string;
}

export default function ErrorMessage(props: ErrorMessaageProps) {
  return (
    <>
      <span>{props.text}</span>
    </>
  );
}
