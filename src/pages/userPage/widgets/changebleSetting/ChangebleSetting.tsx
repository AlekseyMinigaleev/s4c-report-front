import { useState } from "react";
import classes from "./changebleSetting.module.css";
import ShowHideEditButtons from "pages/userPage/Components/ShowHideEditButtons";
import EditForm from "./editForm/EditForm";
import { errorMessages } from "hooks/requests/useSetRsyaAuthorizationToken";

export interface changebleSettingProps {
  settingFieldValue?: string;
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

  request: (value: string) => Promise<errorMessages>;
}

export default function ChangebleSetting(props: changebleSettingProps) {
  const [isEditMod, setIsEditMod] = useState<boolean>(
    props.settingFieldValue == undefined
  );
  const [isShow, setIsShow] = useState<boolean>(false);
  const [securitySettingFieldValue, setSettingFieldValue] = useState<
    string | undefined
  >(
    props.settingFieldValue != undefined
      ? props.view.maskSettingValue(props.settingFieldValue)
      : undefined
  );

  function showHideButtonOnClick() {
    setIsShow((prev) => !prev);
    setSettingFieldValue(
      props.view.maskSettingValue(
        props.settingFieldValue != undefined
          ? props.view.maskSettingValue(props.settingFieldValue)
          : ""
      )
    );
  }

  return (
    <>
      <div className={classes["setting-container"]}>
        {isEditMod ? (
          <EditForm
            userFieldSettingValue={props.settingFieldValue}
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
                  {isShow ? props.settingFieldValue : securitySettingFieldValue}
                </p>
              </div>
              <ShowHideEditButtons
                buttonsContainerClass={classes["buttons"]}
                editButtonOnClick={() => setIsEditMod(true)}
                isShow={isShow}
                showHideButtonOnClick={showHideButtonOnClick}
              />
            </div>

            <div className={classes["description-container"]}>
              <p>{props.view.descriptionText}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
