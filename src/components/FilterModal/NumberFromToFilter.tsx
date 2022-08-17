import React from 'react';
import { Button, Field, HorizontalGroup, Input } from '@grafana/ui';
import { css, cx } from 'emotion';
import { TableDataContext } from 'contexts/TableDataProvider';

type Props = {
  columnKey: any;

  onClose: () => void;
};

export default function NumberFromToFilter({ columnKey = '', onClose }: Props) {
  const { query, setQuery } = React.useContext(TableDataContext);

  const [from, setFrom] = React.useState<any>();
  const [to, setTo] = React.useState<any>();

  React.useEffect(() => {
    if (columnKey && query[columnKey]) {
      setFrom(query[columnKey].from || null);
      setTo(query[columnKey].to || null);
    }
  }, [columnKey, query, setQuery]);

  console.log(query);

  function handleSubmit() {
    setQuery((prevState) => ({
      ...prevState,
      [columnKey]: { type: 'number-from-to', from: from || null, to: to || null },
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
        <Field label={'From'} style={{ flex: 1, padding: '0 2px' }}>
          <Input type="number" value={from || ''} onChange={(e: any) => setFrom(e.target.value)} />
        </Field>

        <Field label={'To'} style={{ flex: 1, padding: '0 2px' }}>
          <Input type="number" value={to || ''} onChange={(e: any) => setTo(e.target.value)} />
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
