import { ReactNode } from "react";
import { sort } from "../models/filter";
import { TableHeaderModel } from "../pages/gamesPage/widgets/gameTable/GameTable";
import SortIcon from "../components/sortIcon/SortIcon";

interface SortedTableHeaderProps<T> {
  sort: sort<T>;
  tableHeaders: TableHeaderModel<T>[];
  onClick?: (tableHeader: TableHeaderModel<T>) => void;

  children?: ReactNode;

  containerClass?: string;
  textClass?: string;
}

export default function SortedTableHeader<T>(props: SortedTableHeaderProps<T>) {
  return (
    <thead>
      <tr>
        {props.tableHeaders.map((tableHeader, index) => (
          <th
            key={index}
            colSpan={tableHeader.colSpan ?? 0}
            onClick={() => {
              if (props.onClick !== undefined) {
                props.onClick(tableHeader);
              }
            }}
          >
            <div className={props.containerClass ?? ""}>
              <span className={props.textClass ?? ""}>{tableHeader.label}</span>

              {tableHeader.key == props.sort.key && (
                <SortIcon sort={props.sort.sortType} />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
