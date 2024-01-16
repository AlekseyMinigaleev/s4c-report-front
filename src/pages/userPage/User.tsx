import React, { useEffect, useState } from "react";
import { GetUser, GetUserRsponse } from "../../api/User/GetUser";

export default function User() {
  const [userFields, setUserFields] = useState<GetUserRsponse>();

  useEffect(() => {
    GetUser().then((response) => {
      setUserFields(response);
    });
  }, []);

  return (
    <>
      <form>
        <label>почта</label>
        <input
          type="text"
          value={userFields?.email}
          placeholder={userFields?.email}
        />

        <label>ссылка страницы разработчика</label>
        <input
          type="text"
          value={userFields?.developerPageUrl}
          placeholder={userFields?.developerPageUrl}
        />

        <label>Токен авторизации РСЯ</label>
        <input
          type="text"
          value={userFields?.rsyaAuthorizationToken}
          placeholder={userFields?.rsyaAuthorizationToken}
        />
      </form>
    </>
  );
}
