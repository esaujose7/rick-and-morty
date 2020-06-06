export interface InfoSchema {
  count: number;
  next: string | null;
  pages: number;
  prev: string | null;
}

export interface ListingsResponse<T> {
  info: InfoSchema;
  results: T[];
}