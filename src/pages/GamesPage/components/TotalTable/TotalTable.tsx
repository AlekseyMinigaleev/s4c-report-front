import { Total } from "../../../../hooks/requests/useGetGames";
import classes from "./totalTable.module.css";

interface TotalTableProps {
  total: Total;
  classes: string;
}

export default function TotalTable(props: TotalTableProps) {
  return (
    <>
      <table className={`${classes["table"]} ${props.classes}`}>
        <thead>
          <tr>
            <th>Количество игроков:</th>
            <td>{props.total.playersCount.toLocaleString()}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Прибыль (RUB):</th>
            <td>
              {props.total.cashIncome
                ? props.total.cashIncome.toLocaleString()
                : "-"}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
