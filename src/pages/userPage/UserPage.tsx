import { useEffect, useState } from "react";
import useGetUserInfo, {
  FetchUserRsponse,
} from "../../hooks/requests/useFetchUser";
import classes from "./userPage.module.css";
import UserFieldManagmentPanel from "./widgets/UserFieldManagmentPanel";

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
          <UserFieldManagmentPanel
            fieldName={"Адрес электронной почты"}
            description={
              "Этот адрес электронной почты привязан к вашей учетной записи."
            }
            editDescription="Новый адрес электронной почты, который будет привязан к вашей учетной записи"
            fieldValue={userFields?.email}
          />

          <UserFieldManagmentPanel
            fieldName={"Ссылка на страницу разработчика"}
            fieldValue={userFields?.developerPageUrl}
            description={
              "Ссылка на аккаунт по которого собирается статистика игр."
            }
          />
          
          <UserFieldManagmentPanel
            fieldName={"Токен авториазции РСЯ"}
            description={
              "Токен авторизации в системе РСЯ, позволяющий собирать данные о доходе."
            }
            editDescription="Новый токен авторизации"
            fieldValue={userFields?.rsyaAuthorizationToken}
          />
        </div>
      </div>
    </>
  );
}
