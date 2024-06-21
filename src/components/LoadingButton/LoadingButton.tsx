import classes from "./LoadingButton.module.css";

interface LoadingButtonProps {
  text: string;
  onClick: () => void;
  isLoading: boolean;
  classes: string;
  loader: JSX.Element;
  disable?: boolean;
}

export default function LoadingButton(props: LoadingButtonProps) {
  return (
    <>
      <button
        className={`${classes["submit-btn"]} ${props.classes}`}
        onClick={props.onClick}
        disabled={props.isLoading || props.disable}
      >
        {!props.isLoading ? props.text : props.loader}
      </button>
    </>
  );
}
