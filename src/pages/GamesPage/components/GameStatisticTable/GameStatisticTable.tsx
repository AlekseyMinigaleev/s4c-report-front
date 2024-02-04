import { useState } from "react";
import classes from "./GameStatisticTable.module.css";
import LoadingButton from "../../../../components/LoadingButton/LoadingButton";

interface GameStatisticTableProps {
  gameId: string;
  classes: string;
}

export default function GameStatisticTable(props: GameStatisticTableProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <div className={classes["container"]}>
        <table className={`${props.classes} ${classes["table"]}`}>
          <thead>
            <th>Дата синхронизации</th>
            <th>Оценка</th>
            <th>Количество игроков</th>
            <th>Прибыль(RUB)</th>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <div className={classes["download-more"]}>
          <LoadingButton
            classes={classes["download-more-button"]}
            text={"Загрузить еще"}
            onClick={()=>{setIsLoading(true)}}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
}
