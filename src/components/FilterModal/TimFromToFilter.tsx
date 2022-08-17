import React from 'react';
import { Button, Field, HorizontalGroup, TimeOfDayPicker } from '@grafana/ui';
import { css, cx } from 'emotion';
import { TableDataContext } from 'contexts/TableDataProvider';

type Props = {
  columnKey: any;

  onClose: () => void;
};

export default function TimFromToFilter({ columnKey = '', onClose }: Props) {
  const { query, setQuery } = React.useContext(TableDataContext);

  const [from, setFrom] = React.useState<any>('2022-08-13T17:00:50.929Z');
  const [to, setTo] = React.useState<any>('2022-08-14T16:59:50.929Z');

  React.useEffect(() => {
    if (columnKey && query[columnKey]) {
      setFrom(query[columnKey].from || null);
      setTo(query[columnKey].to || null);
    }
  }, [columnKey, query, setQuery]);

  function handleSubmit() {
    setQuery((prevState) => ({
      ...prevState,
      [columnKey]: { type: 'time-from-to', from: from || null, to: to || null },
    }));
    onClose();
  }

  return (
    <>
      <div
        className={cx(css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `)}
      >
        <Field label="From" style={{ flex: 1, padding: '0 2px' }}>
          <TimeOfDayPicker onChange={(newValue: any) => setFrom(newValue.toISOString())} value={from} />
        </Field>

        <Field label="To" style={{ flex: 1, padding: '0 2px' }}>
          <TimeOfDayPicker onChange={(newValue: any) => setTo(newValue.toISOString())} value={to} />
        </Field>
      </div>

      {/* footer */}
      <div
        className={cx(css`
          margin-top: 8px;
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
