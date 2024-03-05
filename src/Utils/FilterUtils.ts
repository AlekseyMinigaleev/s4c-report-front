import { Sort, SortType } from "../models/Filter";
import { TableHeaderModel } from "../pages/GamesPage/components/GameTable/GameTable";

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

export function getNewSort<T>(tableHeader:TableHeaderModel<T>,sort: Sort<T>): Sort<T> {
  const newSort: Sort<T> = {
    key: tableHeader.key,
    sortType:
      sort.key == tableHeader.key
        ? sort.sortType === SortType.asc
          ? SortType.desc
          : SortType.asc
        : SortType.desc,
  };

  return newSort;
}
