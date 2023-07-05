export interface GetWithPagination {
  skip: number;
  take: number;
}

export interface GetWithPaginationResponse<T> {
  count: number;
  rows: T;
}

export interface Row<T> {
  row: T;
}
