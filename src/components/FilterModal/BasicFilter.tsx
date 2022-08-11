import { Button, Checkbox, HorizontalGroup, Icon, Input, VerticalGroup } from '@grafana/ui';
import { TableDataContext } from 'contexts/TableDataProvider';
import { css, cx } from 'emotion';
import React from 'react';

type SelectDataType = {
  label: any;
  value: any;
  isChecked: boolean;
};

type Props = {
  selectData: Array<{ label: any; value: any }>;
  columnKey: any;

  onClose: () => void;
};

export default function BasicFilter({ selectData = [], columnKey = '', onClose }: Props) {
  const { columns, setFilterColumns } = React.useContext(TableDataContext);

  const [data, setData] = React.useState<SelectDataType[]>([]);
  const [searchValue, setSearchValue] = React.useState<any>('');

  const filterSelectData = React.useCallback(() => {
    if (selectData.length > 0) {
      const hashMap = new Map();
      const filterData = selectData
        .map((item) => {
          if (!hashMap.has(item.value)) {
            hashMap.set(item.value, true);
            return { ...item, isChecked: false };
          }
          return { ...item, value: null, isChecked: false };
        })
        .filter((item) => typeof item.value === 'boolean' || item.value);

      return filterData;
    }

    return [];
  }, [selectData]);

  React.useEffect(() => {
    setData(filterSelectData());
  }, [filterSelectData]);

  const handleSubmit = () => {
    const filterData = data.filter((item) => item.isChecked).map((item) => item.value);
    const filterDataHashMap: any = {};

    for (const key of filterData) {
      filterDataHashMap[key] = key;
    }

    if (filterData.length > 0) {
      let filterColumns = columns.filter(
        (record) => typeof filterDataHashMap[record[columnKey]] === 'boolean' || filterDataHashMap[record[columnKey]]
      );

      setFilterColumns(filterColumns);
    }

    onClose();
  };

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value === '') {
      setData(filterSelectData());
    } else {
      const searchData = filterSelectData().filter((item) => item.value.toLowerCase().includes(value.toLowerCase()));

      setData(searchData);
    }
  };

  return (
    <>
      {/* body */}
      <Input value={searchValue} onChange={handleSearch} prefix={<Icon name="search" placeholder="Filter values" />} />

      <div
        className={cx(css`
          margin-top: 12px;
          padding: 0 6px;
          max-height: 148px;

          overflow-y: auto;
        `)}
      >
        <VerticalGroup>
          {data.length > 0 &&
            data.map((item, index) => (
              <Checkbox
                key={index}
                onChange={() =>
                  setData((prevState) => {
                    prevState[index].isChecked = !prevState[index].isChecked;

                    return [...prevState];
                  })
                }
                label={item.label}
                value={item.isChecked}
              />
            ))}
        </VerticalGroup>
      </div>

      {/* footer */}
      <div
        className={cx(css`
          margin-top: 18px;
        `)}
      >
        <HorizontalGroup>
          <Button size="sm" onClick={handleSubmit}>
            Ok
          </Button>
          <Button size="sm" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </HorizontalGroup>
      </div>
    </>
  );
}
