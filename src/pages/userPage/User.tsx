import React, { useEffect, useRef, useState } from "react";
import useApiPrivate from "../../hooks/useApiPrivate";
import useFetchUser, {
  FetchUserRsponse,
} from "../../hooks/requests/useFetchUser";

export default function User() {
  const [userFields, setUserFields] = useState<FetchUserRsponse>();

  const api = useApiPrivate();

  const fetchUser = useFetchUser();

  useEffect(() => {
    fetchUser().then((user) => setUserFields(user));
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
