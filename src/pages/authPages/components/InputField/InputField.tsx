import classes from "./inputField.module.css";
import formClasses from "../form/form.module.css";
import ErrorMessage from "../errorMessaage/ErrorMessage";


interface InputFieldProps {
  type: string;
  placeholderText: string;
  required?: boolean;
  isValid: boolean;
  errorMessage: string;
  onChange: (value: string) => void;
}

export default function InputField(props: InputFieldProps) {
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
