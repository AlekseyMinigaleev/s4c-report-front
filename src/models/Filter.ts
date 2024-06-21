export interface paginate {
  itemsPerPage: number;
  pageNumber: number;
}

export interface sort<T> {
  key: keyof T;
  sortType: sortType;
}

export enum sortType {
  "asc" = 0,
  "desc" = 1,
}
