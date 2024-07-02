// export interface IError {
//   message: string;
//   code: string;
// }

// export interface IApiResponse<T> {
//   data: T;
//   error: IError;
// }

export interface IPageResponse<T> {
  items: T[];
  metadata: IPageMetadata;
  // error: IError;
}
export interface IListResponse<T> {
  items: T[];
}

export interface IPageMetadata {
  total: number;
  page: number;
  size: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export const defaultPageMetadata: IPageMetadata = {
  total: 0,
  page: 0,
  size: 5, // take
  hasNext: false,
  hasPrev: false,
};
