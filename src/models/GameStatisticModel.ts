import { valueWithProgressModel } from "./valueWithProgress";

export interface gameStatisticModel {
  evaluation: number;
  rating: valueWithProgressModel;
  cashIncome: valueWithProgressModel;
  lastSynchroDate: Date;
}
