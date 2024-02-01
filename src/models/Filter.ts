export interface Paginate {
  itemsPerPage: number;
  pageNumber: number;
}

export interface Sort<T> {
  key: T;
  sortType: sortType;
}

export type sortType = "asc" | "desc";
