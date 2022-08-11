export interface SimpleOptions {
  baseUrl: string;
  isRenderTableDataFromUrl: boolean;
  showErrorBackground: boolean;
  showForm: boolean;
  showReportButton: boolean;
  isPagination: boolean;
  limitPerPage: number;
}

export type FilterType = 'time-from-to';

export type HeaderSelectDataType = {
  label: string;
  id: any;
};

export type HeaderTypeTypes = 'date' | 'select';

export type HeaderTypes = {
  key: string;
  title: string;

  data?: HeaderSelectDataType[];
  type?: HeaderTypeTypes;
  format?: string;
  condition?: [string, string, string];
  filter?: boolean;
  filterType?: FilterType;
};

export type ColumnTypes = {
  [key: string]: any;
};
