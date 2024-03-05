import sortIcon from "../../images/sort-icon.png";
import { SortType } from "../../models/Filter";
import classes from "./SortIcon.module.css";

interface SortIconProps {
  sortType: SortType;
}

export default function SortIcon({ sortType }: SortIconProps) {
  const className = classes["img"];

  return (
    <img
      className={`${className} ${classes[SortType[sortType]]}`}
      src={sortIcon}
    />
  );
}
