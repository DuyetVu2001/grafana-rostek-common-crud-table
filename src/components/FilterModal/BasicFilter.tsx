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
  const { query, setQuery } = React.useContext(TableDataContext);

  const [data, setData] = React.useState<SelectDataType[]>([]);
  const [searchValue, setSearchValue] = React.useState<any>('');
  const [isCheckedAll, setIsCheckedAll] = React.useState(false);

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
    let isSelectedAnyValue = false;
    query?.[columnKey]?.list?.forEach((item: any) => item.isChecked && (isSelectedAnyValue = true));

    // check if not select any value and filterData changed => re-calculate options data
    const isReCalculate = query?.[columnKey]?.list?.length !== filterSelectData()?.length && !isSelectedAnyValue;

    if ((columnKey && !query[columnKey]) || isReCalculate) {
      setQuery((prevState) => ({ ...prevState, [columnKey]: { type: 'select', list: filterSelectData() } }));
    } else if (columnKey && query[columnKey]) {
      setData(query[columnKey]?.list?.map((item: any) => ({ ...item })) || []);
    }
  }, [filterSelectData, columnKey, query, setQuery]);

  const handleSubmit = () => {
    setQuery((prevState) => ({ ...prevState, [columnKey]: { ...query[columnKey], list: data } }));
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

  function handleCheckAll() {
    const updateCheckAll = !isCheckedAll;
    setIsCheckedAll(updateCheckAll);

    if (updateCheckAll) {
      setData((prevState) => prevState.map((item) => ({ ...item, isChecked: true })));
    } else {
      setData((prevState) => prevState.map((item) => ({ ...item, isChecked: false })));
    }
  }

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
          <Checkbox onChange={handleCheckAll} label="Check all" value={isCheckedAll} />

          {data.length > 0 &&
            data.map((item, index) => (
              <Checkbox
                key={index}
                onChange={() =>
                  setData((prevState) => {
                    prevState[index].isChecked = !prevState[index].isChecked;

                    setIsCheckedAll(false);

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
