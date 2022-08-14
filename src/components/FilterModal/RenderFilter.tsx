import CustomButton from 'components/CustomButton';
import { TableDataContext } from 'contexts/TableDataProvider';
import React from 'react';
import { FilterType, HeaderTypes } from 'types';
import FilterModal from '.';

type Props = {
  filterType?: FilterType;
  header?: HeaderTypes;
  id: any;
};

export default function RenderFilter({ header, filterType, id = '' }: Props) {
  const { columns } = React.useContext(TableDataContext);

  switch (filterType) {
    case 'time-from-to':
      return (
        <CustomButton.FilterButton
          renderFilterModal={(onClose) => <FilterModal.TimFromToFilter onClose={onClose} columnKey={id} />}
        />
      );

    case 'number-from-to':
      return (
        <CustomButton.FilterButton
          renderFilterModal={(onClose) => <FilterModal.NumberFromToFilter onClose={onClose} columnKey={id} />}
        />
      );

    default:
      let selectData = columns.map((record) => ({ label: record[id], value: record[id] }));

      if (header?.type === 'select') {
        const headerDataHashMap: any = {};

        header.data?.forEach((item) => {
          headerDataHashMap[item.id] = item.label;
        });

        selectData = selectData.map((item) => ({ ...item, label: headerDataHashMap[item.value] }));
      }

      return (
        <CustomButton.FilterButton
          renderFilterModal={(onClose) => (
            <FilterModal.BasicModal onClose={onClose} selectData={selectData} columnKey={id} />
          )}
        />
      );
  }
}
