import { useState } from "react";
import classes from "./changebleSetting.module.css";
import ShowHideEditButtons from "pages/userPage/Components/ShowHideEditButtons";

export interface changebleSettingProps {
  settingFieldValue: string;
  descriptionText: string;
  editDescriptionText: string;
  maskSettingValue: (settingValue: string) => string;
}

export default function ChangebleSetting(props: changebleSettingProps) {
  const [isEditMod, setIsEditMod] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [securitySettingFieldValue, setSettingFieldValue] = useState<string>(
    props.maskSettingValue(props.settingFieldValue)
  );

  function showHideButtonOnClick() {
    setIsShow((prev) => !prev);
    setSettingFieldValue(props.maskSettingValue(props.settingFieldValue));
  }

  return (
    <>
      <div className={classes["setting-container"]}>
        {isEditMod ? (
          <div className={classes["edit-container"]}>
            <input value={props.settingFieldValue} />
            <p>{props.descriptionText}</p>
            <div className={classes["edit-container-buttons"]}>
              <button>Сохранить</button>
              <button onClick={() => setIsEditMod(false)}>Отмена</button>
            </div>
          </div>
        ) : (
          <>
            <div>
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
          </>
        )}
      </div>

      {isEditMod ? null : (
        <div className={classes["description-container"]}>
          <p>{props.descriptionText}</p>
        </div>
      )}
    </>
  );
}
