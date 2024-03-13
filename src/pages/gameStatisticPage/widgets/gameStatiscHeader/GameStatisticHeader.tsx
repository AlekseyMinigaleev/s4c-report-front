import { getGameByIdResponse } from "hooks/requests/useGetGameById";
import classes from "./gameStatisticHeader.module.css";

interface GameStatisticHeaderProps {
  game: getGameByIdResponse;
}

export default function GameStatisticHeader(props: GameStatisticHeaderProps) {
  return (
    <>
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
    </>
  );
}
