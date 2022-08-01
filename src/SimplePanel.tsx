import React, { useState, useEffect } from 'react';

import { PanelProps } from '@grafana/data';
import { Button } from '@grafana/ui';
import { ColumnTypes, HeaderTypes, SimpleOptions } from 'types';
import { css, cx } from 'emotion';

import CreateModal from 'components/CreateModal';
import UpdateModal from 'components/UpdateModal';
import TableCustom from 'components/TableCustom';
import { getAll, getHeaders } from 'api';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [headers, setHeaders] = useState<HeaderTypes[] | []>([]);
  const [columns, setColumns] = useState<ColumnTypes[] | []>([]);

  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState({
    isOpen: false,
    data: null as any,
  });

  useEffect(() => {
    if (options.isRenderTableDataFromUrl && options.baseUrl) {
      const fetchData = async () => {
        const { data: columns } = await getAll(options.baseUrl);
        const { data: headers } = await getHeaders(options.baseUrl);

        setHeaders(headers.data || []);
        setColumns(columns.data || []);
      };

      fetchData();
      return;
    }

    if (data.series[0] && data.series[0].fields) {
      const series1 = data.series[0];
      const fields = series1.fields;
      const numberOfRecords = series1.length;

      // get headers
      const headers =
        fields.length > 0
          ? fields.map((field) => ({
              key: field.name,
              title: field.config?.displayName || field.name,
            }))
          : [];

      // get columns data
      const sourceColumns: { [key: string]: any[] } = {};
      fields.forEach((field) => {
        sourceColumns[field.name] = field.values.toArray();
      });

      // convert "sourceColumns" to expected "columns" format
      const columns = [];
      for (let index = 0; index < numberOfRecords; index++) {
        const record: { [key: string]: any } = {};

        headers.forEach(({ key }) => {
          record[key] = sourceColumns[key][index];
        });

        columns.push(record);
      }

      setHeaders(headers);
      setColumns(columns);
    }
  }, [data.series, options.isRenderTableDataFromUrl, options.baseUrl]);

  return (
    <div
      className={cx(
        css`
          position: relative;
          width: ${width}px;
          height: ${height}px;
          overflow: hidden;
        `
      )}
    >
      {/* create button */}
      <div
        className={cx(css`
          display: flex;
          justify-content: flex-end;
          margin-bottom: 10px;
        `)}
      >
        <Button onClick={() => setModalCreate(true)}>Create</Button>
      </div>

      {/* table */}
      <div
        className={cx(css`
          height: ${height - 60}px;
          overflow: auto;
        `)}
      >
        <TableCustom
          headers={headers}
          columns={columns}
          handleClickRow={(record: any) =>
            setModalUpdate({
              ...modalUpdate,
              isOpen: true,
              data: record,
            })
          }
        />
      </div>

      {/* modals */}
      <CreateModal baseUrl={options.baseUrl} isOpen={modalCreate} onClose={() => setModalCreate(false)} />

      <UpdateModal
        baseUrl={options.baseUrl}
        isOpen={modalUpdate.isOpen}
        data={modalUpdate?.data}
        onClose={() => setModalUpdate({ ...modalUpdate, isOpen: false, data: null })}
      />
    </div>
  );
};
