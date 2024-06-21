import { valueWithProgressModel } from "./ValueWithProgress";

export interface gameStatisticModel {
  evaluation: number;
  rating: valueWithProgressModel;
  cashIncome: valueWithProgressModel;
  lastSynchroDate: Date;
}
