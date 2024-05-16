import { getGameByIdResponse } from "hooks/requests/useGetGameById";
import classes from "./gameStatisticHeader.module.css";
import SetPageId from "./setPageIdWidget/SetPageId";
import BlureContainer from "widgets/blureContainer/BlureContainer";
import ConfidentioalContainer from "widgets/confidentialContainer/confidentialContainer";

interface GameStatisticHeaderProps {
  game: getGameByIdResponse;
  gameId: string;
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
                <ConfidentioalContainer>
                  <SetPageId gameId={props.gameId} pageId={props.game.pageId} />
                </ConfidentioalContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
