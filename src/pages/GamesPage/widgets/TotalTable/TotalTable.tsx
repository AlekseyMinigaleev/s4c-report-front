import { Total } from "../../../../hooks/requests/useGetGames";
import classes from "./TotalTable.module.css"

interface TotalTableProps {
  total: Total;
  classes?: string;
}

export default function TotalTable(props: TotalTableProps) {
  return (
    <>
      <table className={`${props.classes} ${classes["table"]}`}>
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
