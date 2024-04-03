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

export default function UserPage() {
  const [userFields, setUserFields] = useState<FetchUserRsponse>();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const getUserInfo = useGetUserInfo();

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
                settingFieldValue={userFields?.email}
                descriptionText={
                  "Этот адрес электронной почты привязан к вашей учетной записи."
                }
                editDescriptionText={
                  "Новый адрес электронной почты, который будет привязан к вашей учетной записи."
                }
                maskSettingValue={maskEmail}
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
                settingFieldValue={userFields?.rsyaAuthorizationToken!}
                descriptionText={
                  "Токен авторизации в системе РСЯ, позволяющий собирать данные о доходе."
                }
                editDescriptionText={"Новый токен авторизации"}
                maskSettingValue={maskRsyaAuthorizationToken}
              />
            </UserSetttingsRow>
          </div>
        </div>
      )}
    </>
  );
}
