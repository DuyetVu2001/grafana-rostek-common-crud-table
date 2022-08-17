import { getAll } from 'api';
import React, { Dispatch, SetStateAction } from 'react';
import { ColumnTypes, QueryType, SimpleOptions } from 'types';

/*eslint no-restricted-imports: ["error", "fs"]*/
import moment from 'moment';
import { calculateHHmmToMinute } from 'utils';

export const TableDataContext = React.createContext<{
  columns: ColumnTypes[] | [];
  setColumns: Dispatch<SetStateAction<[] | ColumnTypes[]>>;

  filterColumns: ColumnTypes[] | [];
  setFilterColumns: Dispatch<SetStateAction<[] | ColumnTypes[]>>;

  paginationColumns: ColumnTypes[] | [];
  setPaginationColumns: Dispatch<SetStateAction<[] | ColumnTypes[]>>;

  panelOptions: SimpleOptions | null;
  setPanelOptions: Dispatch<SetStateAction<SimpleOptions | null>>;

  reload: any;
  setReload: Dispatch<SetStateAction<any>>;

  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;

  totalPage: number;
  setTotalPage: Dispatch<SetStateAction<number>>;

  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;

  query: QueryType;
  setQuery: Dispatch<SetStateAction<QueryType>>;
}>({} as any);

type Props = {
  children: React.ReactNode;
};

export default function TableDataProvider({ children }: Props) {
  // TODO: useReducer instead of useState
  const [columns, setColumns] = React.useState<ColumnTypes[] | []>([]);
  const [filterColumns, setFilterColumns] = React.useState<ColumnTypes[] | []>([]);
  const [paginationColumns, setPaginationColumns] = React.useState<ColumnTypes[] | []>([]);

  const [panelOptions, setPanelOptions] = React.useState<SimpleOptions | null>(null);
  const [reload, setReload] = React.useState<any>(null);

  const [totalPage, setTotalPage] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [limit, setLimit] = React.useState(1);

  const [query, setQuery] = React.useState<QueryType>({});

  React.useEffect(() => {
    const paginationData = filterColumns.slice((currentPage - 1) * limit, currentPage * limit);

    // reset current page to 1 if pagination data is less than limit * page
    if (Math.ceil(filterColumns.length / limit) < currentPage) {
      setCurrentPage(1);
    }

    setPaginationColumns(paginationData);
  }, [filterColumns, limit, currentPage]);

  React.useEffect(() => {
    setTotalPage(Math.ceil(filterColumns.length / limit));
  }, [filterColumns, limit]);

  React.useEffect(() => {
    setLimit(panelOptions?.limitPerPage || 10);
  }, [panelOptions?.limitPerPage]);

  // listen when filter query changed
  React.useEffect(() => {
    // check object is empty or not
    if (Object.keys(query).length > 0) {
      if (panelOptions?.isServerFilter) {
        return;
      } else {
        let filterData: ColumnTypes[] | [] = JSON.parse(JSON.stringify(columns));

        // loop through query object and filter data
        Object.keys(query).forEach((key) => {
          if (query?.[key].type === 'select') {
            const selectedData =
              query[key].list?.filter((item: any) => item.isChecked).map((item: any) => item.value) || [];

            // if not empty => filter data
            if (selectedData.length > 0) {
              filterData = filterData.filter((item: any) => selectedData.includes(item[key]));
            }
          } else if (query?.[key].type === 'number-from-to') {
            const from = query[key].from;
            const to = query[key].to;
            console.log(from, to);

            if (from && !Number.isInteger(to)) {
              filterData = filterData.filter((item: any) => +item[key] >= +from);
            } else if (!Number.isInteger(from) && to) {
              filterData = filterData.filter((item: any) => +item[key] <= +to);
            } else if (from && to) {
              filterData = filterData.filter((item: any) => +item[key] >= +from && +item[key] <= +to);
            }
          } else if (query?.[key].type === 'time-from-to') {
            const from = query[key].from;
            const to = query[key].to;

            if (!from && !to) {
              setFilterColumns(columns);
            } else if (from && !to) {
              filterData = filterData.filter(
                (record) =>
                  calculateHHmmToMinute(moment(record[key], 'X').format('HH:mm')) >=
                  calculateHHmmToMinute(moment(from).format('HH:mm'))
              );
            } else if (!from && to) {
              filterData = filterData.filter(
                (record) =>
                  calculateHHmmToMinute(moment(record[key], 'X').format('HH:mm')) <=
                  calculateHHmmToMinute(moment(to).format('HH:mm'))
              );
            } else {
              filterData = filterData.filter(
                (record) =>
                  calculateHHmmToMinute(moment(record[key], 'X').format('HH:mm')) >=
                    calculateHHmmToMinute(moment(from).format('HH:mm')) &&
                  calculateHHmmToMinute(moment(record[key], 'X').format('HH:mm')) <=
                    calculateHHmmToMinute(moment(to).format('HH:mm'))
              );
            }
          }
        });

        setFilterColumns(filterData);
      }
    }
  }, [currentPage, limit, query, columns, panelOptions?.isServerFilter]);

  // fetch data from url
  React.useEffect(() => {
    if (panelOptions?.isRenderTableDataFromUrl && panelOptions?.baseUrl) {
      const fetchData = async () => {
        const { data: columns } = await getAll(panelOptions?.baseUrl);

        setColumns(columns.data || []);
        setFilterColumns(columns.data || []);
      };

      fetchData();
      return;
    }
  }, [setColumns, setFilterColumns, panelOptions?.isRenderTableDataFromUrl, panelOptions?.baseUrl, reload]);

  return (
    <TableDataContext.Provider
      value={{
        columns,
        setColumns,

        filterColumns,
        setFilterColumns,

        paginationColumns,
        setPaginationColumns,

        panelOptions,
        setPanelOptions,

        reload,
        setReload,

        currentPage,
        setCurrentPage,

        totalPage,
        setTotalPage,

        limit,
        setLimit,

        query,
        setQuery,
      }}
    >
      {children}
    </TableDataContext.Provider>
  );
}
