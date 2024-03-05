import lodash from "lodash";
import { Sort, SortType } from "./Filter";
import { ValueWithProgressModel } from "./ValueWithProgress";

export interface Game {
  id: string;
  name: string;
  publicationDate: Date;
  evaluation: number;
  cashIncome: cashIncome;
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

export function sortGames(games: Game[], sort: Sort<Game>): Game[] {
  let sortedGames: Game[] = [];
  const key = sort.key;

  const sortType = SortType[sort.sortType] as "asc" | "desc";

  if (key == "cashIncome" || key == "playersCount") {
    sortedGames = lodash.orderBy(
      games,
      (x) => x[key]?.valueWithProgress?.actualValue,
      [sortType]
    );
  } else {
    sortedGames = lodash.orderBy(games, [sort.key], [sortType]);
  }

  return sortedGames;
}
