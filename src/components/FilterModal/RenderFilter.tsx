import CustomButton from 'components/CustomButton';
import { TableDataContext } from 'contexts/TableDataProvider';
import React from 'react';
import { FilterType } from 'types';
import FilterModal from '.';

type Props = {
  type?: FilterType;
  id: any;
};

export default function RenderFilter({ type, id = '' }: Props) {
  const { columns } = React.useContext(TableDataContext);

  switch (type) {
    case 'time-from-to':
      return (
        <CustomButton.FilterButton
          renderFilterModal={(onClose) => <FilterModal.NumberFromToFilter onClose={onClose} columnKey={id} />}
        />
      );
      break;

    default:
      return (
        <CustomButton.FilterButton
          renderFilterModal={(onClose) => (
            <FilterModal.BasicModal onClose={onClose} selectData={columns.map((record) => record[id])} columnKey={id} />
          )}
        />
      );
      break;
  }
}
