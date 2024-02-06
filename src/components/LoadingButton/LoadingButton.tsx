import { SyncLoader } from "react-spinners";
import classes from "./LoadingButton.module.css";

interface LoadingButtonProps {
  text: string;
  onClick: () => void;
  isLoading: boolean;
  classes: string;
}

export default function LoadingButton(props: LoadingButtonProps) {
  return (
    <>
      <button
        className={`${classes["submit-btn"]} ${props.classes}`}
        onClick={props.onClick}
        disabled={props.isLoading}
      >
        {!props.isLoading ? props.text : <SyncLoader size={10} />}
      </button>
    </>
  );
}
