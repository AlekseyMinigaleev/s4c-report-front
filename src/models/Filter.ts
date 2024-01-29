export interface Paginate {
  itemsPerPage: number;
  pageNumber: number;
}

export interface Sort {
  fieldName: string;
  sortType: SortType;
}

export enum SortType {
  ascending = 0,
  descending = 1,
}
