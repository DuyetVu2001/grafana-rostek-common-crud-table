export interface SimpleOptions {
  baseUrl: string;
  isRenderTableDataFromUrl: boolean;
  showErrorBackground: boolean;
  showForm: boolean;
  showReportButton: boolean;
  isPagination: boolean;
  limitPerPage: number;
  isServerFilter: boolean;
}

export type FilterType = 'time-from-to' | 'number-from-to' | 'select';

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

export type QueryType = {
  [key: string]: {
    type: FilterType;
    list?: Array<{ label: any; value: any; isChecked: boolean }>;
    value?: string | number;
    from?: string | number;
    to?: string | number;
  };
};
