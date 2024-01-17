import React, { useEffect, useRef, useState } from "react";
import { GetUserRsponse } from "../../api/User/GetUser";
import useApiPrivate from "../../hooks/useApiPrivate";

export default function User() {
  const [userFields, setUserFields] = useState<GetUserRsponse>();
  const apiPrivate = useApiPrivate();

  useEffect(() => {
    apiPrivate
      .get<GetUserRsponse>("User/getUser", {
        withCredentials: true,
      })
      .then((response) => setUserFields(response.data));
  }, []);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
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
