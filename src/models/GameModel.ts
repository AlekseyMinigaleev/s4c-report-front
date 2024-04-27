import lodash from "lodash";
import { sort, sortType } from "./Filter";
import { valueWithProgressModel as valueWithProgressModel } from "./ValueWithProgress";

export interface game {
  id: string;
  name: string;
  publicationDate: Date;
  evaluation: number;
  url: string;
  previewURL: string;
  categories: string[];
  cashIncome?: cashIncome;
  rating?: valueWithProgressModel;
}

export interface cashIncome {
  valueWithProgress: valueWithProgressModel;
  percentage: number;
}