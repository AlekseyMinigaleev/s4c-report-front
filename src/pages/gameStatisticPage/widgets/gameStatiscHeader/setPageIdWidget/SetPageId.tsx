import LoadingButton from "components/loadingButton/LoadingButton";
import classes from "./setPageId.module.css";
import { BarLoader } from "react-spinners";
import useSetPageId from "hooks/requests/useSetPageId";
import { useState } from "react";

interface SetPageIdProps {
  gameId: string;
  pageId?: number;
}

export default function SetPageId(props: SetPageIdProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccessfulySet, setIsSuccessfulySet] = useState<boolean>();
  const [currentPageId, setCurrentPageId] = useState<number | undefined>(
    props.pageId
  );
  const setPageId = useSetPageId();

  function handleSetPageId() {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await setPageId({
        gameId: props.gameId,
        pageId: currentPageId,
      });
      setIsSuccessfulySet(response[0].isSuccessfullySet);
      setIsLoading(false);
    };

    fetchData();
  }

  function handlePageIdChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentPageId(parseInt(event.target.value, 10));
  }

  return (
    <>
      <div className={classes["pageId-container"]}>
        <div className={classes["server-response-container"]}>
          {currentPageId === null && isSuccessfulySet === undefined ? (
            <p className={classes["error"]}>Значение не установлено</p>
          ) : null}

          {isSuccessfulySet === undefined ? null : isSuccessfulySet ? (
            <p className={classes["success"]}>Значение установлено</p>
          ) : (
            <p className={classes["error"]}>Указано не корректно значение</p>
          )}
        </div>

        <div className={classes["pageId"]}>
          <label htmlFor="pageId">PageId</label>
          <input
            id="pageId"
            value={currentPageId}
            type="number"
            onChange={handlePageIdChange}
          />
          <LoadingButton
            text={"установить"}
            onClick={handleSetPageId}
            isLoading={isLoading}
            classes={classes["center"]}
            loader={<BarLoader color="white" />}
          />
        </div>
      </div>
    </>
  );
}
