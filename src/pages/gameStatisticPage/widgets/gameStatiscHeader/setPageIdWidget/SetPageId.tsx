import classes from "./setPageId.module.css";
import { BarLoader } from "react-spinners";
import useSetPageId from "hooks/requests/useSetPageId";
import { useState } from "react";

interface SetPageIdProps {
  gameId: string;
  pageId?: number;
}

export default function SetPageId(props: SetPageIdProps) {
  const [settedValue, setSettedValue] = useState<number | undefined>(
    props.pageId
  );
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
      const responseArray = await setPageId({
        gameId: props.gameId,
        pageId: currentPageId,
      });

      const response = responseArray[0];

      setIsSuccessfulySet(response.isSuccessfullySet);
      if (response.isSuccessfullySet) {
        setSettedValue(response.pageId);
        setIsInputValueActual(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }

  function handlePageIdChange(event: React.ChangeEvent<HTMLInputElement>) {
    let inputValue = event.target.value;

    setIsSuccessfulySet(undefined);

    if (inputValue.length > 11) {
      inputValue = inputValue.slice(0, 11);
    }

    let pageIdValue: number | undefined;
    if (inputValue === "") {
      pageIdValue = undefined;
    } else {
      const parsedValue = parseInt(inputValue, 10);
      pageIdValue = parsedValue < 0 ? 0 : parsedValue;
    }

    setCurrentPageId(pageIdValue);
    if (pageIdValue == settedValue) {
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
            value={String(currentPageId)}
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
            {!isLoading ? "установить" : <BarLoader width={"84.1"} color="white" />}
          </button>
        </div>
      </div>
    </>
  );
}
