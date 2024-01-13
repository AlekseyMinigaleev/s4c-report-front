import React, { useEffect, useState } from "react";
import classes from "./InputField.module.css";

interface InputFieldProps {
  type: string;
  placeholderText: string;
  required?: boolean;
  isValid: boolean;
  errorMessage: string;
  onChange: (value: string) => void;
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
