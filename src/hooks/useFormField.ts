import { useState } from "react";

export function useFormField<T>(
  initialState: T,
  validationFunction: (value: T, ...args: any[]) => boolean
) {
  const [value, setValue] = useState<T>(initialState);
  const [isValid, setIsValid] = useState<boolean>(true);

  function handleChange(value: T, ...args: any[]): void {
    setValue(value);
    setIsValid(validationFunction(value, args));
  }

  return {
    value,
    isValid,
    handleChange,
    setIsValid,
  };
}
