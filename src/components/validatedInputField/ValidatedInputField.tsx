import classes from "./validatedInputField.module.css";
import ErrorMessage from "../errorMessaage/ErrorMessage";

interface ValidatedInputFieldProps {
  type: string;
  placeholderText: string;
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
