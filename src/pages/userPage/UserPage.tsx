import { useEffect, useState } from "react";
import useGetUserInfo, {
  FetchUserRsponse,
} from "../../hooks/requests/useFetchUser";
import classes from "./userPage.module.css";

import showIcon from "../../resources/images/show.png";
import editIcon from "../../resources/images/edit.png";
import hideIcon from "../../resources/images/hide.png";

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
          <div className={classes["container"]}>
            <div className={classes["label-container"]}>
              <label>Адрес электронной почты</label>
            </div>
            <div className={classes["content-container"]}>
              <div className={classes["email"]}>
                <div className={classes["email-text"]}>
                  <p>{userFields?.email}</p>
                </div>
                <div className={classes["buttons"]}>
                  <div className={classes["show-button"]}>
                    <button>
                      <img src={showIcon} />
                    </button>
                  </div>
                  <div className={classes["show-button"]}>
                    <button>
                      <img src={hideIcon} />
                    </button>
                  </div>
                  <div className={classes["edit-button"]}>
                    <button>
                      <img src={editIcon} />
                    </button>
                  </div>
                </div>
              </div>
              <div className={classes["description-container"]}>
                <p>
                  Этот адрес электронной почты привязан к вашей учетной записи.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
