import ValidatedInputField from "components/validatedInputField/ValidatedInputField";
import classes from "./editForm.module.css";
import LoadingButton from "components/loadingButton/LoadingButton";
import { useContext, useState } from "react";
import { BarLoader } from "react-spinners";
import { edit } from "../ChangebleSetting";
import { useFormField } from "hooks/useFormField";
import { getErrorMessage } from "pages/authPages/helpers/utils";
import { ChangebleSettingContext } from "../changebleSettingContext";

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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changebleSettingContext = useContext(ChangebleSettingContext);

  async function submitButtonHandler() {
    setIsLoading(true);

    const response = await props.edit.request(inputField.value);

    if (Array.isArray(response.ErrorMessages)) {
      inputField.setIsValid(false);
      setErrorMessages(response.ErrorMessages);
      changebleSettingContext?.setUserSettingFieldState((prev) => ({
        ...prev,
        isSuccessfulySet: false,
      }));
    } else {
      changebleSettingContext?.setUserSettingFieldState({
        actualValue: inputField.value,
        isSuccessfulySet: true,
      });

      props.cancelButtonOnClick();
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className={classes["edit-container"]}>
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
              !inputField.isValid ||
              changebleSettingContext?.userSettingFieldState.actualValue ==
                inputField.value
            }
            text={"Сохранить"}
            onClick={submitButtonHandler}
            isLoading={isLoading}
            classes={"gray-button"}
            loader={<BarLoader width={"72px"} />}
          />
          <button
            disabled={
              changebleSettingContext?.userSettingFieldState.actualValue ==
              undefined
            }
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
