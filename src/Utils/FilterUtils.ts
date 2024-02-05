import { Sort, SortType } from "../models/Filter";

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

export function getNewSort<T>(sort: Sort<T>): Sort<T> {
  const newSort: Sort<T> = {
    key: sort.key,
    sortType:
      sort.key == sort.key
        ? sort.sortType === SortType.asc
          ? SortType.desc
          : SortType.asc
        : SortType.desc,
  };

  return newSort;
}
