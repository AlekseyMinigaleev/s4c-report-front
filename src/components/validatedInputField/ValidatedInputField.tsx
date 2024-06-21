import classes from "./validatedInputField.module.css";
import ErrorMessage from "../errorMessaage/ErrorMessage";
import { ReactNode } from "react";

interface ValidatedInputFieldProps {
  type: string;
  placeholderText: string;
  labelText: ReactNode;
  required?: boolean;
  isValid: boolean;
  errorMessage: string;
  onChange: (value: string) => void;

  value?: string;
  inputContainerClasses?: string;
}

export default function ValidatedInputField(props: ValidatedInputFieldProps) {
  const inputClasses = `${classes["input-field"]} ${
    !props.isValid ? `${classes["invalid"]}` : ""
  }`;

  return (
    <div
      className={`${classes["input-container"]} ${props.inputContainerClasses}`}
    >
      {props.labelText}
      <input
        className={inputClasses}
        type={`${props.type}`}
        placeholder={`${props.placeholderText}`}
        required={require == null ? false : props.required}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value ?? ""}
      />
      {!props.isValid ? <ErrorMessage text={props.errorMessage} /> : null}
    </div>
  );
}
