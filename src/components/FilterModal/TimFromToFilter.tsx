import React from 'react';
import { Button, Field, HorizontalGroup, TimeOfDayPicker } from '@grafana/ui';
import { css, cx } from 'emotion';
import { TableDataContext } from 'contexts/TableDataProvider';

/*eslint no-restricted-imports: ["error", "fs"]*/
import moment from 'moment';

type Props = {
  columnKey: any;

  onClose: () => void;
};

function calculateHHmmToMinute(time: string) {
  const [hours, minutes] = time.split(':');
  return +minutes + +hours * 60;
}

export default function TimFromToFilter({ columnKey = '', onClose }: Props) {
  const { columns, setFilterColumns } = React.useContext(TableDataContext);

  const [from, setFrom] = React.useState<any>('2022-08-13T17:00:50.929Z');
  const [to, setTo] = React.useState<any>('2022-08-14T16:59:50.929Z');

  function handleSubmit() {
    if (!from && !to) {
      setFilterColumns(columns);
    } else if (from && !to) {
      setFilterColumns(
        columns.filter(
          (record) =>
            calculateHHmmToMinute(moment(record[columnKey], 'X').format('HH:mm')) >=
            calculateHHmmToMinute(moment(from).format('HH:mm'))
        )
      );
    } else if (!from && to) {
      setFilterColumns(
        columns.filter(
          (record) =>
            calculateHHmmToMinute(moment(record[columnKey], 'X').format('HH:mm')) <=
            calculateHHmmToMinute(moment(to).format('HH:mm'))
        )
      );
    } else {
      setFilterColumns(
        columns.filter(
          (record) =>
            calculateHHmmToMinute(moment(record[columnKey], 'X').format('HH:mm')) >=
              calculateHHmmToMinute(moment(from).format('HH:mm')) &&
            calculateHHmmToMinute(moment(record[columnKey], 'X').format('HH:mm')) <=
              calculateHHmmToMinute(moment(to).format('HH:mm'))
        )
      );
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
