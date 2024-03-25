import { getGameByIdResponse } from "hooks/requests/useGetGameById";
import classes from "./gameStatisticHeader.module.css";

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

          <div>
            <p className={classes["title"]}>{props.game.name}</p>

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
                <p className={classes["error-message"]}>Указано не корректно значение</p>
                <p className={classes["success-message"]}>Значение установлено</p>
              </div>
              <div className={classes["pageId"]}>
                <label htmlFor="pageId">PageId</label>
                <input id="pageId" placeholder="pageId" value={props.game.pageId}/>
                <button>установить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
