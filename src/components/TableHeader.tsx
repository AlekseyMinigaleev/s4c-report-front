import { ReactNode, useState } from "react";
import { Sort } from "../models/Filter";
import { TableHeaderModel } from "../pages/GamesPage/components/GameTable/GameTable";
import SortIcon from "./SortIcon/SortIcon";

interface TableHeaderProps<T> {
  sort: Sort<T>;
  tableHeaders: TableHeaderModel<T>[];
  onClick?: () => void;

  children?: ReactNode;

  containerClass?: string;
  textClass?: string;
}

export default function TableHeader<T>(props: TableHeaderProps<T>) {
  return (
    <thead>
      <tr>
        {props.tableHeaders.map((tableHeader, index) => (
          <th
            key={index}
            colSpan={tableHeader.colSpan ?? 0}
            onClick={() => {
              if (props.onClick !== undefined) {
                props.onClick();
              }
            }}
          >
            <div className={props.containerClass ?? ""}>
              <span className={props.textClass ?? ""}>{tableHeader.label}</span>

              {tableHeader.key == props.sort.key && (
                <SortIcon sortType={props.sort.sortType} />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
