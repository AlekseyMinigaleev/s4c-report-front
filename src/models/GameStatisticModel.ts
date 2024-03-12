import { ValueWithProgressModel } from "./valueWithProgress";

export interface GameStatisticModel {
  evaluation: number;
  rating: ValueWithProgressModel;
  cashIncome: ValueWithProgressModel;
  lastSynchroDate: Date;
}
