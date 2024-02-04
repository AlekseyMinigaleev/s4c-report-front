import loadingIcon from "../../images/loading-icon.png";
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
        {!props.isLoading ? (
          props.text
        ) : (
          <img src={loadingIcon} alt="загрузка" className={classes["spinner"]} />
        )}
      </button>
    </>
  );
}
