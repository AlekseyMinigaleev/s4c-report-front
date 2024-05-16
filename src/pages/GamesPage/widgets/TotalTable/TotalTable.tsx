import BlureContainer from "widgets/blureContainer/BlureContainer";
import { Total } from "../../../../hooks/requests/useGetGames";
import classes from "./TotalTable.module.css";
import ConfidentioalContainer from "widgets/confidentialContainer/confidentialContainer";

interface TotalTableProps {
  total: Total;
  classes?: string;
  borderClasses?: string;
}

export default function TotalTable(props: TotalTableProps) {
  return (
    <>
      <table
        className={`${props.classes} ${props.borderClasses} ${classes["table"]}`}
      >
        <tbody>
          <tr>
            <th>Прибыль (RUB):</th>
            <td>
              <ConfidentioalContainer>
                {props.total.cashIncome
                  ? props.total.cashIncome.toLocaleString()
                  : "-"}
              </ConfidentioalContainer>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
