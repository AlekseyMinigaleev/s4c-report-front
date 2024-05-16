import classes from "./switchButton.module.css";

export interface SwitchButtonProps {
  isOn: boolean;
  handleToggle: () => void;
}

export default function SwitchButton(props: SwitchButtonProps) {
  return (
    <div className={classes["container"]}>
      <input
        checked={props.isOn}
        onChange={props.handleToggle}
        className={classes["react-switch-checkbox"]}
        id="react-switch-new"
        type="checkbox"
      />
      <label
        style={{ background: props.isOn ? "#06D6A0" : "" }}
        className={classes["react-switch-label"]}
        htmlFor="react-switch-new"
      >
        <span className={classes["react-switch-button"]} ></span>
      </label>
    </div>
  );
}
