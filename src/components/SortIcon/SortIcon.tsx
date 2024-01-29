import { SortType } from "../../models/Filter";
import sortIcon from "../../images/sort-icon.png";
import classes from "./SortIcon.module.css";

interface SortIconProps {
  sortType: SortType;
}

export default function SortIcon({ sortType }: SortIconProps) {
  return (
    <img
      className={
        sortType == SortType.ascending
          ? classes["ascending"]
          : classes["descengin"]
      }
      src={sortIcon}
    />
  );
}
