import { useEffect, useState } from "react";
import classes from "./dinamicField.module.css";
import ShowHideEditButtons from "pages/userPage/Components/ShowHideEditButtons";
import EditForm from "./editForm/EditForm";

import { DinamicFieldContext } from "./DynamicFieldContext";
import { AxiosResponse } from "axios";

export interface dynamicFieldProps {
  value?: string;
  view: view;
  edit: edit;
}

export interface view {
  maskSettingValue: (settingValue: string) => string;
  descriptionText: string;
}

export interface edit {
  validatedInputType: string;
  validateFunction: (value: string) => boolean;
  editDescriptionText: string;
  errorMessage: string;
  successfullyMessage: string;

  request: (value: string) => Promise<
    AxiosResponse<
      {
        ErrorMessages: string[];
      },
      any
    >
  >;
  updateLocalStorage: (value: string) => void;
  // TODO: убрать после реализации смены email.
  disableEditButton: boolean;
}

export interface userSettingFieldState {
  actualValue?: string;
  isSuccessfulySet: boolean;
}

export default function DynamicField(props: dynamicFieldProps) {
  const [isEditMod, setIsEditMod] = useState<boolean>(
    props.value == undefined
  );

  const [isShow, setIsShow] = useState<boolean>(false);

  const [userSettingFieldState, setUserSettingFieldState] =
    useState<userSettingFieldState>({
      actualValue: props.value,
      isSuccessfulySet: false,
    });

  const [securitySettingFieldValue, setSecuritySettingFieldValue] = useState<
    string | undefined
  >(
    userSettingFieldState.actualValue != undefined &&
      userSettingFieldState.actualValue != ""
      ? props.view.maskSettingValue(userSettingFieldState.actualValue)
      : undefined
  );

  useEffect(() => {
    if (
      userSettingFieldState.actualValue != undefined &&
      userSettingFieldState.actualValue != ""
    ) {
      setSecuritySettingFieldValue(
        props.view.maskSettingValue(userSettingFieldState.actualValue)
      );

      if (userSettingFieldState.isSuccessfulySet) {
        props.edit.updateLocalStorage(userSettingFieldState.actualValue);
      }
    }
  }, [userSettingFieldState.actualValue]);

  function showHideButtonOnClick() {
    setIsShow((prev) => !prev);
    setSecuritySettingFieldValue(
      props.view.maskSettingValue(
        userSettingFieldState.actualValue != undefined &&
          userSettingFieldState.actualValue != ""
          ? props.view.maskSettingValue(userSettingFieldState.actualValue)
          : ""
      )
    );
  }

  return (
    <>
      <DinamicFieldContext.Provider
        value={{
          setUserSettingFieldState: setUserSettingFieldState,
          userSettingFieldState: userSettingFieldState,
        }}
      >
        <div className={classes["setting-container"]}>
          {userSettingFieldState.isSuccessfulySet ? (
            <div className={classes["successfuly-message"]}>
              <p>{props.edit.successfullyMessage}</p>
            </div>
          ) : null}

          {isEditMod ? (
            <EditForm
              value={userSettingFieldState.actualValue}
              cancelButtonOnClick={() => {
                setIsEditMod(false);
              }}
              edit={props.edit}
            />
          ) : (
            <div className={classes["view-wrapper"]}>
              <div className={classes["view-container"]}>
                <div className={classes["setting-value"]}>
                  <p>
                    {isShow
                      ? userSettingFieldState.actualValue
                      : securitySettingFieldValue}
                  </p>
                </div>
                <ShowHideEditButtons
                  buttonsContainerClass={classes["buttons"]}
                  editButtonOnClick={() => setIsEditMod(true)}
                  isShow={isShow}
                  showHideButtonOnClick={showHideButtonOnClick}
                  disableEditButton={props.edit.disableEditButton}
                />
              </div>

              <div className={classes["description-container"]}>
                <p>{props.view.descriptionText}</p>
              </div>
            </div>
          )}
        </div>
      </DinamicFieldContext.Provider>
    </>
  );
}
