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
  const [isInputValueActual, setIsInputValueActual] = useState<boolean>(true);
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
    let pageIdValue: number | undefined;
    if (event.currentTarget.value === "") {
      pageIdValue = undefined;
    } else {
      const parsedValue = parseInt(event.target.value, 10);
      pageIdValue = parsedValue < 0 ? 0 : parsedValue;
    }

    setCurrentPageId(pageIdValue);
    setIsSuccessfulySet(undefined);
    if (pageIdValue == props.pageId) {
      setIsInputValueActual(true);
    } else {
      setIsInputValueActual(false);
    }
  }

  return (
    <>
      <div className={classes["pageId-container"]}>
        <div className={classes["server-response-container"]}>
          {(currentPageId === null || currentPageId === undefined) &&
          isSuccessfulySet === undefined ? (
            <p className={classes["error"]}>Значение не установлено</p>
          ) : null}

          {isSuccessfulySet === undefined ||
          isInputValueActual ? null : isSuccessfulySet ? (
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

          <button
            onClick={handleSetPageId}
            disabled={isInputValueActual || isLoading}
            className={
              isInputValueActual
                ? classes["disable-button"]
                : isLoading
                ? `${classes["laoding-button"]} ${classes["active-button"]}`
                : classes["active-button"]
            }
          >
            {!isLoading ? "установить" : <BarLoader color="white" />}
          </button>
        </div>
      </div>
    </>
  );
}
