import lodash from "lodash";
import { Sort } from "./Filter";
import { ValueWithProgressModel } from "./ValueWithProgress";

export interface Game {
  name: string;
  publicationDate: Date;
  evaluation: number;
  cashIncome:cashIncome
  playersCount: playersCount;
}

export interface cashIncome {
  valueWithProgress?: ValueWithProgressModel;
  percentage?: number;
}

export interface playersCount {
  valueWithProgress: ValueWithProgressModel;
  percentage: number;
}

export function sortGames(games: Game[], sort: Sort<keyof Game>): Game[] {
  let sortedGames: Game[] = [];
  const key = sort.key;

  if (key == "cashIncome" || key == "playersCount") {
    sortedGames = lodash.orderBy(
      games,
      (x) => x[key]?.valueWithProgress?.actualValue,
      [sort.sortType]
    );
  } else {
    sortedGames = lodash.orderBy(games, [sort.key], [sort.sortType]);
  }

  return sortedGames;
}
