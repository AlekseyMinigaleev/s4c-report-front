export interface Paginate {
  itemsPerPage: number;
  pageNumber: number;
}

export interface Sort<T> {
  key: keyof T;
  sortType: SortType;
}

export enum SortType {
  "asc" = 0,
  "desc" = 1,
}
