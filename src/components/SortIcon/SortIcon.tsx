import { SortType } from "../../models/Filter";
import sortIcon from "../../images/sort-icon.png";
import classes from "./SortIcon.module.css";

interface SortIconProps {
  sortType: SortType;
}

export default function SortIcon({ sortType }: SortIconProps) {
  const directionClassName = sortType == SortType.ascending
  ? classes["ascending"]
  : classes["descengin"];
  const className = classes["img"];

  return (
    <img
      className={`${className} ${directionClassName}`}
        
      src={sortIcon}
    />
  )
}
