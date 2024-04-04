import { useEffect, useState } from "react";
import classes from "./changebleSetting.module.css";
import ShowHideEditButtons from "pages/userPage/components/ShowHideEditButtons";
import EditForm from "./editForm/EditForm";
import { CHLENI } from "hooks/requests/useSetRsyaAuthorizationToken";

import { ChangebleSettingContext } from "./changebleSettingContext";

export interface changebleSettingProps {
  actualSettingValue?: string;
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

  request: (value: string) => Promise<{ ErrorMessages: string[] }>;
  disableEditButton: boolean;
}

export interface userSettingFieldState {
  actualValue?: string;
  isSuccessfulySet: boolean;
}

export default function ChangebleSetting(props: changebleSettingProps) {
  const [isEditMod, setIsEditMod] = useState<boolean>(
    props.actualSettingValue == undefined
  );

  const [isShow, setIsShow] = useState<boolean>(false);

  const [userSettingFieldState, setUserSettingFieldState] =
    useState<userSettingFieldState>({
      actualValue: props.actualSettingValue,
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
      <ChangebleSettingContext.Provider
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
              userFieldSettingValue={props.actualSettingValue}
              edit={props.edit}
              cancelButtonOnClick={() => {
                setIsEditMod(false);
              }}
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
      </ChangebleSettingContext.Provider>
    </>
  );
}
