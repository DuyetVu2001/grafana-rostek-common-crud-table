export interface SimpleOptions {
  baseUrl: string;
  isRenderTableDataFromUrl: boolean;
  showErrorBackground: boolean;
  showForm: boolean;
  isPagination: boolean;
  limitPerPage: number;
}

export type FilterType = null | 'time-from-to';

export type HeaderTypes = {
  key: string;
  title: string;

  type?: 'date';
  format?: string;
  condition?: [string, string, string];
  filter?: boolean;
  filterType?: FilterType;
};

export type ColumnTypes = {
  [key: string]: any;
};
