import sortIcon from "../../resources/images/sort-icon.png";
import { SortType } from "../../models/filter";
import classes from "./sortIcon.module.css";

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
