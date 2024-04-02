import { useState } from "react";
import classes from "./changebleFieldText.module.css";
import ShowHideEditButtons from "pages/userPage/Components/ShowHideEditButtons";

export interface changebleFieldTextProps {
  fieldValue: string;
  editDescriptionText: string;
  descriptionText: string;
}

export default function ChangebleFieldText(props: changebleFieldTextProps) {
  const [isEditMod, setIsEditMod] = useState<boolean>(false);
  return (
    <>
      <div className={classes["field-text-container"]}>
        {isEditMod ? (
          <div className={classes["edit-form"]}>
            <input value={props.fieldValue} />
            <p>{props.editDescriptionText}</p>
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
          <p>{props.descriptionText}</p>
        </div>
      )}
    </>
  );
}
