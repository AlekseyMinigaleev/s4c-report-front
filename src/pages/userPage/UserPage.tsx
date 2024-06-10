import { useEffect, useState } from "react";
import useGetUserInfo, {
  FetchUserRsponse,
} from "../../hooks/requests/useFetchUser";
import classes from "./userPage.module.css";
import ManagmentPanel from "./widgets/ManagmentPanel";
import DynamicField from "./widgets/dynamicField/DynamicField";
import StaticField from "./widgets/staticField/StaticField";
import {
  maskEmail,
  maskRsyaAuthorizationToken,
} from "./widgets/maskSettingFunctions";
import {
  validateEmail,
  validateRsyaAuthorizationToken,
} from "pages/authPages/helpers/validations";
import { DEFAULT_USER_FIELDS_ERROR_MESSAGES } from "Utils/constants";
import useSetRsyaAuthorizationToken from "hooks/requests/useSetRsyaAuthorizationToken";
import { developerInfo } from "models/DeveloperInfo";
import SwitchButton from "components/switchButton/SwitchButton";

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

  const [isConfidentialModeOn, setIsConfidentialMode] = useState<boolean>(
    () => {
      const storedValue = localStorage.getItem("isConfidentialModeOn");
      return storedValue === "true";
    }
  );

  function confidentioalModeHandle() {
    setIsConfidentialMode((prev) => {
      const newValue = !prev;
      localStorage.setItem("isConfidentialModeOn", `${newValue}`);
      return newValue;
    });
  }

  return (
    <>
      {userFields?.developerPageUrl === undefined ||
      userFields.email === undefined ? null : (
        <div className={classes["wrapper"]}>
          <div className={classes["user-settings-container"]}>
            <ManagmentPanel settingFieldName={"Адрес электронной почты"}>
              <DynamicField
                value={userFields?.email}
                view={{
                  maskSettingValue: maskEmail,
                  descriptionText:
                    "Этот адрес электронной почты привязан к вашей учетной записи",
                }}
                edit={{
                  errorMessage: DEFAULT_USER_FIELDS_ERROR_MESSAGES.email,
                  editDescriptionText:
                    "Новый адрес электронной почты, который будет привязан к вашей учетной записи",
                  successfullyMessage:
                    "Адрес электронной почты успешно обновлен.",
                  validatedInputType: "email",
                  validateFunction: validateEmail,
                  updateLocalStorage: function (value: string) {
                    throw new Error("Function not implemented.");
                  },
                  request: function (value: string) {
                    throw new Error("Function not implemented.");
                  },

                  disableEditButton: true,
                }}
              />
            </ManagmentPanel>

            <ManagmentPanel
              settingFieldName={"Ссылка на страницу разработчика"}
            >
              <StaticField
                fieldValue={
                  <a
                    className="link-color"
                    href={userFields?.developerPageUrl!}
                  >
                    {userFields?.developerPageUrl!}
                  </a>
                }
                description={
                  "Ссылка на страницу разработчика, по которой собирается статистика"
                }
              />
            </ManagmentPanel>

            <ManagmentPanel settingFieldName={"Токен авториазции РСЯ"}>
              <DynamicField
                value={userFields?.rsyaAuthorizationToken!}
                view={{
                  maskSettingValue: maskRsyaAuthorizationToken,
                  descriptionText:
                    "Токен авторизации в системе РСЯ, позволяющий собирать данные о доходе",
                }}
                edit={{
                  errorMessage:
                    DEFAULT_USER_FIELDS_ERROR_MESSAGES.rsyaAuthorizationToken,
                  successfullyMessage:
                    "Токен авторизации РСЯ успешно установлен",
                  editDescriptionText: "Новый токен авторизации РСЯ",
                  validatedInputType: "text",
                  validateFunction: validateRsyaAuthorizationToken,
                  updateLocalStorage: (value: string) => {
                    const storedData = localStorage.getItem("developerInfo");
                    if (!storedData) {
                      return;
                    }

                    const developerInfo: developerInfo = JSON.parse(storedData);

                    if (value) developerInfo.isRsyaAuthorizationTokenSet = true;
                    else developerInfo.isRsyaAuthorizationTokenSet = false;

                    localStorage.setItem(
                      "developerInfo",
                      JSON.stringify(developerInfo)
                    );
                  },
                  request: (value) => setRsyaAuthorizationToken(value),

                  disableEditButton: false,
                }}
              />
            </ManagmentPanel>

            <ManagmentPanel settingFieldName="Конфиденциальный режим">
              <StaticField
                fieldValue={
                  <>
                    <SwitchButton
                      isOn={isConfidentialModeOn}
                      handleToggle={confidentioalModeHandle}
                    />
                  </>
                }
                description={
                  "Режим при котором вся конфидециальная информация, не  вывыодится"
                }
              ></StaticField>
            </ManagmentPanel>
          </div>
        </div>
      )}
    </>
  );
}
