import React, { Dispatch, SetStateAction } from 'react';
import { ColumnTypes } from 'types';

export const TableDataContext = React.createContext<{
  columns: ColumnTypes[] | [];
  setColumns: Dispatch<SetStateAction<[] | ColumnTypes[]>>;

  filterColumns: ColumnTypes[] | [];
  setFilterColumns: Dispatch<SetStateAction<[] | ColumnTypes[]>>;
}>({} as any);

type Props = {
  children: React.ReactNode;
};

export default function TableDataProvider({ children }: Props) {
  const [columns, setColumns] = React.useState<ColumnTypes[] | []>([]);
  const [filterColumns, setFilterColumns] = React.useState<ColumnTypes[] | []>([]);

  return (
    <TableDataContext.Provider
      value={{
        columns,
        setColumns,

        filterColumns,
        setFilterColumns,
      }}
    >
      {children}
    </TableDataContext.Provider>
  );
}
