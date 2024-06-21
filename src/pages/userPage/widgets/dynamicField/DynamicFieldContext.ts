import React from "react";
import { userSettingFieldState } from "./DynamicField";

export const DinamicFieldContext = React.createContext<
  DinamicFieldContext | undefined
>(undefined);

interface DinamicFieldContext {
  setUserSettingFieldState: React.Dispatch<
    React.SetStateAction<userSettingFieldState>
  >;
  userSettingFieldState: userSettingFieldState;
}
