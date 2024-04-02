import { useEffect, useState } from "react";
import useGetUserInfo, {
  FetchUserRsponse,
} from "../../hooks/requests/useFetchUser";
import classes from "./userPage.module.css";
import UserFieldManagmentPanel from "./widgets/UserFieldManagmentPanel";
import ChangebleFieldText from "./widgets/ChangebleFieldText/ChangebleFieldText";
import StaticFieldText from "./widgets/StaticFieldText/StaticFieldText";

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
        <div className={classes["form"]}>
          <UserFieldManagmentPanel fieldName={"Адрес электронной почты"}>
            <ChangebleFieldText
              fieldValue={userFields?.email!}
              editDescriptionText={
                "Новый адрес электронной почты, который будет привязан к вашей учетной записи"
              }
              descriptionText={
                "Этот адрес электронной почты привязан к вашей учетной записи."
              }
            />
          </UserFieldManagmentPanel>

          <UserFieldManagmentPanel
            fieldName={"Ссылка на страницу разработчика"}
          >
            <StaticFieldText
              fieldValue={userFields?.developerPageUrl!}
              description={
                "Ссылка на страницу разработчика, по которой собирается статистика  "
              }
            />
          </UserFieldManagmentPanel>

          <UserFieldManagmentPanel fieldName={"Токен авториазции РСЯ"}>
            <ChangebleFieldText
              fieldValue={userFields?.rsyaAuthorizationToken!}
              editDescriptionText={"Новый токен авторизации"}
              descriptionText={
                "Токен авторизации в системе РСЯ, позволяющий собирать данные о доходе."
              }
            />
          </UserFieldManagmentPanel>
        </div>
      </div>
    </>
  );
}
