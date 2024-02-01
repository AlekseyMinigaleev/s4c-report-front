import sortIcon from "../../images/sort-icon.png";
import { sortType } from "../../models/Filter";
import classes from "./SortIcon.module.css";

interface SortIconProps {
  sortType: sortType;
}

export default function SortIcon({ sortType }: SortIconProps) {
  const className = classes["img"];

  return <img className={`${className} ${classes[sortType]}`} src={sortIcon} />;
}
