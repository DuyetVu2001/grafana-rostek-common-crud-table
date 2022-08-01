export interface SimpleOptions {
  baseUrl: string;
  isRenderTableDataFromUrl: boolean;
}

export type HeaderTypes = {
  key: string;
  title: string;
  type?: 'date';
  format?: string;
};

export type ColumnTypes = {
  [key: string]: any;
};
