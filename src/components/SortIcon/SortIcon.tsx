import sortIcon from "../../resources/images/sort-icon.png";
import { sortType } from "../../models/Filter";
import classes from "./SortIcon.module.css";

interface SortIconProps {
  sort: sortType;
}

export default function SortIcon({ sort }: SortIconProps) {
  const className = classes["img"];

  return (
    <img className={`${className} ${classes[sortType[sort]]}`} src={sortIcon} />
  );
}
