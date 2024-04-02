import ShowHideEditButtons from "pages/userPage/Components/ShowHideEditButtons";
import classes from "./userFieldManagmentPanel.module.css";
import { useState } from "react";

export interface userFieldManagmentPanelProps {
  fieldName?: string;
  fieldValue?: string;
  description?: string;
  editDescription?: string;
}

export default function UserFieldManagmentPanel(
  props: userFieldManagmentPanelProps
) {
  const [isEditMod, setIsEditMod] = useState<boolean>(false);

  return (
    <>
      <div className={classes["container"]}>
        <div className={classes["label-container"]}>
          <label>{props.fieldName}</label>
        </div>
        <div className={classes["content-container"]}>
          <div className={classes["field-text-container"]}>
            {isEditMod ? (
              <div className={classes["edit-form"]}>
                <input value={props.fieldValue} />
                <p>{props.editDescription}</p>
                <div className={classes["edit-form-buttos-container"]}>
                  <button>Сохранить</button>
                  <button onClick={() => setIsEditMod(false)}>Отмена</button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <p>{props.fieldValue}</p>
                </div>
                <ShowHideEditButtons
                buttonsContainerClass={classes["buttons"]}
                  editButtonOnClick={() => setIsEditMod(true)}
                />
              </>
            )}
          </div>
          {isEditMod ? null : (
            <div className={classes["description-container"]}>
              <p>{props.description}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
