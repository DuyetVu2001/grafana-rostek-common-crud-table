import CustomButton from 'components/CustomButton';
import { TableDataContext } from 'contexts/TableDataProvider';
import React from 'react';
import { FilterType, HeaderTypes } from 'types';
import FilterModal from '.';

type Props = {
  filterType?: FilterType;
  header?: HeaderTypes;
  columnKey: any;

  showFilter: boolean;
  currentFilter: null | number;

  openFilter: () => void;
  closeFilter: () => void;
};

export default function RenderFilter({
  header,
  showFilter,
  filterType,
  columnKey: id = '',
  openFilter,
  closeFilter,
}: Props) {
  const { filterColumns } = React.useContext(TableDataContext);

  switch (filterType) {
    case 'time-from-to':
      return (
        <CustomButton.FilterButton
          columnKey={id}
          showFilter={showFilter}
          openFilter={openFilter}
          renderFilterModal={() => <FilterModal.TimFromToFilter onClose={closeFilter} columnKey={id} />}
        />
      );

    case 'number-from-to':
      return (
        <CustomButton.FilterButton
          columnKey={id}
          showFilter={showFilter}
          openFilter={openFilter}
          renderFilterModal={() => <FilterModal.NumberFromToFilter onClose={closeFilter} columnKey={id} />}
        />
      );

    default:
      let selectData = filterColumns.map((record) => ({ label: record[id], value: record[id] }));

      if (header?.type === 'select') {
        const headerDataHashMap: any = {};

        header.data?.forEach((item) => {
          headerDataHashMap[item.id] = item.label;
        });

        selectData = selectData.map((item) => ({ ...item, label: headerDataHashMap[item.value] }));
      }

      return (
        <CustomButton.FilterButton
          columnKey={id}
          showFilter={showFilter}
          openFilter={openFilter}
          renderFilterModal={() => (
            <FilterModal.BasicModal onClose={closeFilter} selectData={selectData} columnKey={id} />
          )}
        />
      );
  }
}
