import { ClickedGame } from "../../GameTable";
import classes from "./ModalHeader.module.css";


interface ModalHeaderProps {
  clickedGame: ClickedGame;
}

export default function ModalHeader(props: ModalHeaderProps) {
  return (
    <>
      <div className={classes["preview"]}>
        <img
          className={classes["img"]}
          src={props.clickedGame.previewURL}
          width={275}
          height={175}
        />
      </div>

      <div>
        <p className={classes["title"]}>{props.clickedGame.gameName}</p>

        <div className={classes["categories"]}>
          {props.clickedGame.categories.map((category, index) => (
            <span className={classes["category"]} key={index}>
              {category}
            </span>
          ))}
        </div>

        <div
          className={classes["game-link"]}
          onClick={() => (window.location.href = props.clickedGame.url)}
        >
          <a href={props.clickedGame.url} className={classes["link"]}>
            Перейти
          </a>
        </div>
      </div>
    </>
  );
}
