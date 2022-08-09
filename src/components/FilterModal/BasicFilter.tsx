import { Button, Checkbox, HorizontalGroup, Icon, Input, VerticalGroup } from '@grafana/ui';
import { TableDataContext } from 'contexts/TableDataProvider';
import { css, cx } from 'emotion';
import React from 'react';

type SelectDataType = {
  name: any;
  isChecked: boolean;
};

type Props = {
  selectData: any[];
  columnKey: any;

  onClose: () => void;
};

export default function BasicFilter({ selectData = [], columnKey = '', onClose }: Props) {
  const { columns, setFilterColumns } = React.useContext(TableDataContext);

  const [data, setData] = React.useState<SelectDataType[]>([]);
  const [searchValue, setSearchValue] = React.useState<any>('');

  React.useEffect(() => {
    if (selectData.length > 0) {
      const hashMap = new Map();
      const newData = selectData
        .map((item) => {
          if (!hashMap.has(item)) {
            hashMap.set(item, true);
            return { name: item, isChecked: false };
          }
          return { name: null, isChecked: false };
        })
        .filter((item) => item.name);

      setData(newData);
    }
  }, [selectData]);

  const handleSubmit = () => {
    const filterData = data.filter((item) => item.isChecked).map((item) => item.name);
    const filterDataHashMap: any = {};

    for (const key of filterData) {
      filterDataHashMap[key] = key;
    }

    if (filterData.length > 0) {
      let filterColumns = columns.filter((record) => filterDataHashMap[record[columnKey]]);

      setFilterColumns(filterColumns);
    }

    onClose();
  };

  const handleSearch = (e: any) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value === '') {
      const hashMap = new Map();
      const newData = selectData
        .map((item) => {
          if (!hashMap.has(item)) {
            hashMap.set(item, true);
            return { name: item, isChecked: false };
          }
          return { name: null, isChecked: false };
        })
        .filter((item) => item.name);

      setData(newData);
    } else {
      const hashMap = new Map();
      const newData = selectData
        .map((item) => {
          if (!hashMap.has(item)) {
            hashMap.set(item, true);
            return { name: item, isChecked: false };
          }
          return { name: null, isChecked: false };
        })
        .filter((item) => item.name && item.name.toLowerCase().includes(value.toLowerCase()));

      setData(newData);
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
                label={item.name}
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
