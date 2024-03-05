import classes from "./validatedInputField.module.css";
import formClasses from "../../widgets/form.module.css";
import ErrorMessage from "../errorMessaage/ErrorMessage";

interface ValidatedInputFieldProps {
  type: string;
  placeholderText: string;
  required?: boolean;
  isValid: boolean;
  errorMessage: string;
  onChange: (value: string) => void;
}

export default function ValidatedInputField(props: ValidatedInputFieldProps) {
  const inputClasses = `${classes["input-field"]} ${
    !props.isValid ? `${classes["invalid"]}` : ""
  }`;

  return (
    <div className={`${classes["input-container"]} ${formClasses["section"]}`}>
      <input
        className={inputClasses}
        type={`${props.type}`}
        placeholder={`${props.placeholderText}`}
        required={require == null ? false : props.required}
        onChange={(e) => props.onChange(e.target.value)}
      />
      {!props.isValid ? <ErrorMessage text={props.errorMessage} /> : null}
    </div>
  );
}
