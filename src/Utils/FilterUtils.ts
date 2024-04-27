import { sort, sortType } from "../models/Filter";
import { TableHeaderModel } from "../pages/gamesPage/widgets/gameTable/GameTable";

export function paginate<T>(
  data: T[],
  page: number,
  itemsPerPage: number
): T[] {
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  return paginatedData;
}

export function getNewSort<T>(tableHeader:TableHeaderModel<T>,sort: sort<T>): sort<T> {
  const newSort: sort<T> = {
    key: tableHeader.key,
    sortType:
      sort.key == tableHeader.key
        ? sort.sortType === sortType.asc
          ? sortType.desc
          : sortType.asc
        : sortType.desc,
  };

  return newSort;
}
