import { useEffect, useState } from "react";
import useGetUserInfo, {
  FetchUserRsponse,
} from "../../hooks/requests/useFetchUser";
import classes from "./userPage.module.css";
import UserSetttingsRow from "./widgets/UserFieldManagmentPanel";
import ChangebleSetting from "./widgets/changebleSetting/ChangebleSetting";
import StaticSetting from "./widgets/staticSetting/StaticSetting";
import {
  maskEmail,
  maskRsyaAuthorizationToken,
} from "./widgets/maskSettingFunctions";
import {
  validateEmail,
  validateRsyaAuthorizationToken,
} from "pages/authPages/helpers/validations";
import { DEFAULT_USER_FIELDS_ERROR_MESSAGES } from "utils/constants";
import useSetRsyaAuthorizationToken from "hooks/requests/useSetRsyaAuthorizationToken";

export default function UserPage() {
  const [userFields, setUserFields] = useState<FetchUserRsponse>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const getUserInfo = useGetUserInfo();
  const setRsyaAuthorizationToken = useSetRsyaAuthorizationToken();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await getUserInfo();
      setUserFields(response);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {userFields?.developerPageUrl === undefined ||
      userFields.email === undefined ? null : (
        <div className={classes["wrapper"]}>
          <div className={classes["user-settings-container"]}>
            <UserSetttingsRow settingFieldName={"Адрес электронной почты"}>
              <ChangebleSetting
                actualSettingValue={userFields?.email}
                view={{
                  maskSettingValue: maskEmail,
                  descriptionText:
                    "Этот адрес электронной почты привязан к вашей учетной записи.",
                }}
                edit={{
                  errorMessage: DEFAULT_USER_FIELDS_ERROR_MESSAGES.email,
                  editDescriptionText:
                    "Новый адрес электронной почты, который будет привязан к вашей учетной записи.",
                  successfullyMessage:
                    "Адрес электронной почты успешно обновлен.",
                  validatedInputType: "email",
                  validateFunction: validateEmail,
                  request: function (value: string) {
                    throw new Error("Function not implemented.");
                  },

                  disableEditButton: true,
                }}
              />
            </UserSetttingsRow>

            <UserSetttingsRow
              settingFieldName={"Ссылка на страницу разработчика"}
            >
              <StaticSetting
                fieldValue={userFields?.developerPageUrl!}
                description={
                  "Ссылка на страницу разработчика, по которой собирается статистика  "
                }
              />
            </UserSetttingsRow>

            <UserSetttingsRow settingFieldName={"Токен авториазции РСЯ"}>
              <ChangebleSetting
                actualSettingValue={userFields?.rsyaAuthorizationToken!}
                view={{
                  maskSettingValue: maskRsyaAuthorizationToken,
                  descriptionText:
                    "Токен авторизации в системе РСЯ, позволяющий собирать данные о доходе.",
                }}
                edit={{
                  errorMessage:
                    DEFAULT_USER_FIELDS_ERROR_MESSAGES.rsyaAuthorizationToken,
                  successfullyMessage:
                    "Токен авторизации РСЯ успешно установлен.",
                  editDescriptionText: "Новый токен авторизации РСЯ",
                  validatedInputType: "text",
                  validateFunction: validateRsyaAuthorizationToken,
                  request: (value) => setRsyaAuthorizationToken(value),

                  disableEditButton: false,
                }}
              />
            </UserSetttingsRow>
          </div>
        </div>
      )}
    </>
  );
}
