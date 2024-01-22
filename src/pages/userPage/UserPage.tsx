import React, { useEffect, useState } from "react";
import useFetchUser, {
  FetchUserRsponse,
} from "../../hooks/requests/useFetchUser";
import useLoading from "../../hooks/useLoading";

export default function UserPage() {
  const [userFields, setUserFields] = useState<FetchUserRsponse>();

  const { executeRequest } = useLoading(useFetchUser);

  useEffect(() => {
    // TODO: я не понмиаю как сделать перегрузку для этого случая
    executeRequest(undefined).then((user) => setUserFields(user));
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
