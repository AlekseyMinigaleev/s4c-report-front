import { useEffect, useState } from "react";
import useGetUserInfo, {
  FetchUserRsponse,
} from "../../hooks/requests/useFetchUser";
import classes from "./userPage.module.css";
import UserSetttingsRow from "./widgets/UserFieldManagmentPanel";
import ChangebleSetting from "./widgets/changebleSetting/ChangebleSetting";
import StaticSetting from "./widgets/staticSetting/StaticSetting";

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
      <div className={classes["wrapper"]}>
        <div className={classes["user-settings-container"]}>
          <UserSetttingsRow settingFieldName={"Адрес электронной почты"}>
            <ChangebleSetting
              settingFieldValue={userFields?.email!}
              descriptionText={
                "Новый адрес электронной почты, который будет привязан к вашей учетной записи"
              }
              editDescriptionText={
                "Этот адрес электронной почты привязан к вашей учетной записи."
              }
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
              descriptionText={"Новый токен авторизации"}
              editDescriptionText={
                "Токен авторизации в системе РСЯ, позволяющий собирать данные о доходе."
              }
            />
          </UserSetttingsRow>
        </div>
      </div>
    </>
  );
}
