import React, { useEffect, useState } from "react";
import classes from "./InputField.module.css";

interface InputFieldProps {
  type: string;
  placeholderText: string;
  required?: boolean;
  onChange: (value: string) => void;
  isValid: boolean;
  errorMessage: string;
}

export default function InputField(props: InputFieldProps) {
  return (
    <div className={`${classes["input-container"]}`}>
      <input
        className={!props.isValid ? `${classes["invalid"]}` : ""}
        type={`${props.type}`}
        placeholder={`${props.placeholderText}`}
        required={require == null ? false : props.required}
        onChange={(e) => props.onChange(e.target.value)}
      />
      {!props.isValid ? <span>{props.errorMessage}</span> : null}
    </div>
  );
}
