import React from 'react';
import { Button, Field, HorizontalGroup, Input } from '@grafana/ui';
import { css, cx } from 'emotion';
import { TableDataContext } from 'contexts/TableDataProvider';

/*eslint no-restricted-imports: ["error", "fs"]*/
// import moment from 'moment';

type Props = {
  columnKey: any;

  onClose: () => void;
};

export default function NumberFromToFilter({ columnKey = '', onClose }: Props) {
  const { columns, setFilterColumns } = React.useContext(TableDataContext);

  const [from, setFrom] = React.useState<any>();
  const [to, setTo] = React.useState<any>();

  function handleSubmit() {
    if (!from && !to) {
      setFilterColumns(columns);
    } else if (from && !to) {
      setFilterColumns(columns.filter((record) => +record[columnKey] >= +from));
    } else if (!from && to) {
      setFilterColumns(columns.filter((record) => +record[columnKey] <= +to));
    } else {
      setFilterColumns(columns.filter((record) => +record[columnKey] >= +from && +record[columnKey] <= +to));
    }

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
        <Field label={'From'} style={{ flex: 1, padding: '0 2px' }}>
          <Input type="number" value={from} onChange={(e: any) => setFrom(e.target.value)} />
        </Field>

        <Field label={'To'} style={{ flex: 1, padding: '0 2px' }}>
          <Input type="number" value={to} onChange={(e: any) => setTo(e.target.value)} />
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
