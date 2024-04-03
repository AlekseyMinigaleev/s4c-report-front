import ValidatedInputField from "components/validatedInputField/ValidatedInputField";
import classes from "./editForm.module.css";
import LoadingButton from "components/loadingButton/LoadingButton";
import { useState } from "react";
import { BarLoader } from "react-spinners";
import { edit } from "../ChangebleSetting";
import { useFormField } from "hooks/useFormField";
import { getErrorMessage } from "pages/authPages/helpers/utils";
import useSetRsyaAuthorizationToken from "hooks/requests/useSetRsyaAuthorizationToken";

export interface editFromProps {
  userFieldSettingValue?: string;
  edit: edit;

  cancelButtonOnClick: () => void;
}

export default function EditForm(props: editFromProps) {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const inputField = useFormField<string>(
    props.userFieldSettingValue ?? "",
    props.edit.validateFunction
  );
  const [userFieldSettingValue, setUserFieldSettingValue] = useState<
    string | undefined
  >(props.userFieldSettingValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccessfulySet, setIsSuccessfulySet] = useState<boolean>(false);

  async function submitButtonHandler() {
    setIsLoading(true);

    const response = await props.edit.request(inputField.value);

    if (Array.isArray(response.error)) {
      inputField.setIsValid(false);
      setErrorMessages(response.error);
      setIsSuccessfulySet(false);
    } else {
      setUserFieldSettingValue(inputField.value);
      setIsSuccessfulySet(true);
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className={classes["edit-container"]}>
        {isSuccessfulySet ? (
          <div className={classes["successfuly-message"]}>
            <p>{props.edit.successfullyMessage}</p>
          </div>
        ) : null}

        <ValidatedInputField
          type={props.edit.validatedInputType}
          placeholderText={""}
          isValid={inputField.isValid}
          errorMessage={getErrorMessage(props.edit.errorMessage, errorMessages)}
          onChange={inputField.handleChange}
          value={inputField.value}
        />

        <p>{props.edit.editDescriptionText}</p>
        <div className={classes["edit-container-buttons"]}>
          <LoadingButton
            disable={
              !inputField.isValid || userFieldSettingValue == inputField.value
            }
            text={"Сохранить"}
            onClick={submitButtonHandler}
            isLoading={isLoading}
            classes={"gray-button"}
            loader={<BarLoader width={"72px"} />}
          />
          <button
            disabled={userFieldSettingValue == undefined}
            className="gray-button"
            onClick={() => {
              props.cancelButtonOnClick();
            }}
          >
            Отмена
          </button>
        </div>
      </div>
    </>
  );
}
