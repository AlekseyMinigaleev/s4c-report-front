import lodash from "lodash";
import { Sort, SortType } from "./filter";
import { ValueWithProgressModel } from "./valueWithProgress";

export interface Game {
  id: string;
  name: string;
  publicationDate: Date;
  evaluation: number;
  url: string;
  previewURL: string;
  categories: string[];
  cashIncome?: CashIncome;
  rating?: ValueWithProgressModel;
}

export interface CashIncome {
  valueWithProgress: ValueWithProgressModel;
  percentage: number;
}