import React from "react";
import { userSettingFieldState } from "./ChangebleSetting";

export const ChangebleSettingContext = React.createContext<
  ChangebleSettingContext | undefined
>(undefined);

interface ChangebleSettingContext {
  setUserSettingFieldState: React.Dispatch<
    React.SetStateAction<userSettingFieldState>
  >;
  userSettingFieldState: userSettingFieldState;
}
