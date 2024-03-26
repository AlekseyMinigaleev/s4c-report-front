import { getGameByIdResponse } from "hooks/requests/useGetGameById";
import classes from "./gameStatisticHeader.module.css";
import LoadingButton from "components/loadingButton/LoadingButton";
import { BarLoader } from "react-spinners";

interface GameStatisticHeaderProps {
  game: getGameByIdResponse;
}

export default function GameStatisticHeader(props: GameStatisticHeaderProps) {
  return (
    <>
      <div className={classes["wrapper"]}>
        <div className={classes["container"]}>
          <div className={classes["preview"]}>
            <img
              className={classes["img"]}
              src={props.game.previewURL}
              width={275}
              height={175}
            />
          </div>

          <div className={classes["game-info-container"]}>
            <p className={classes["title"]}>{props.game.name}</p>
            <div className={classes["other"]}>
              <div>
                <div className={classes["categories"]}>
                  {props.game.categories.map((category, index) => (
                    <span className={classes["category"]} key={index}>
                      {category}
                    </span>
                  ))}
                </div>

                <div
                  className={classes["game-link"]}
                  onClick={() => (window.location.href = props.game.url)}
                >
                  <a href={props.game.url} className={classes["link"]}>
                    Перейти
                  </a>
                </div>
              </div>

              <div className={classes["pageId-wrapper"]}>
                <div className={classes["pageId-container"]}>
                  <div className={classes["server-response-container"]}>
                    <p className={classes["error"]}>
                      Указано не корректно значение
                    </p>
                    <p className={classes["error"]}>Значение не установлено</p>
                    <p className={classes["success"]}>Значение установлено</p>
                  </div>
                  <div className={classes["pageId"]}>
                    <label htmlFor="pageId">PageId</label>
                    <input id="pageId" value={props.game.pageId} />
                    <LoadingButton
                      text={"установить"}
                      onClick={() => {}}
                      isLoading={false}
                      classes={classes["center"]}
                      loader={<BarLoader color="white" />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
