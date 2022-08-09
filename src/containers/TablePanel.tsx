import React, { useState, useEffect, useContext } from 'react';

import { PanelProps } from '@grafana/data';
import { Button, HorizontalGroup, Pagination } from '@grafana/ui';
import { HeaderTypes, SimpleOptions } from 'types';
import { css, cx } from 'emotion';

import CreateModal from 'components/CreateModal';
import UpdateModal from 'components/UpdateModal';
import TableCustom from 'components/TableCustom';
import { getAll, getHeaders } from 'api';
import { TableDataContext } from 'contexts/TableDataProvider';
import CustomButton from 'components/CustomButton';

interface Props extends PanelProps<SimpleOptions> {}

export const TablePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [headers, setHeaders] = useState<HeaderTypes[] | []>([]);

  const { columns, setColumns, setFilterColumns } = useContext(TableDataContext);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = options.limitPerPage;
  const numberOfPages = Math.ceil(columns.length / limit);

  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState({
    isOpen: false,
    data: null as any,
  });

  useEffect(() => {
    setFilterColumns(columns.slice((currentPage - 1) * limit, currentPage * limit));
  }, [columns, currentPage, limit, setFilterColumns]);

  useEffect(() => {
    if (options.isRenderTableDataFromUrl && options.baseUrl) {
      const fetchData = async () => {
        const { data: columns } = await getAll(options.baseUrl);
        const { data: headers } = await getHeaders(options.baseUrl);

        setHeaders(headers.data || []);
        setColumns(columns.data || []);
        setFilterColumns(columns.data || []);
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
  }, [data.series, options.isRenderTableDataFromUrl, options.baseUrl, setColumns, setFilterColumns]);

  let tableHeight = height - 56;
  if (options.isPagination) {
    tableHeight = height - 96;
  }

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
          margin-bottom: 18px;
        `)}
      >
        <HorizontalGroup justify="flex-end">
          <CustomButton.AutoReportButton />
          <CustomButton.DownloadButton />
          {options.showForm && <Button onClick={() => setModalCreate(true)}>Create</Button>}
        </HorizontalGroup>
      </div>

      {/* table */}
      <div
        className={cx(css`
          height: ${tableHeight}px;
          overflow: auto;
        `)}
      >
        <TableCustom
          headers={headers}
          showErrorBackground={options.showErrorBackground}
          handleClickRow={(record: any) =>
            setModalUpdate({
              ...modalUpdate,
              isOpen: true,
              data: record,
            })
          }
        />

        {options.isPagination && (
          <div
            className={cx(css`
              position: absolute;
              bottom: 0;
              right: 12px;
            `)}
          >
            <Pagination currentPage={currentPage} numberOfPages={numberOfPages} onNavigate={setCurrentPage} />
          </div>
        )}
      </div>

      {/* modals */}
      {options.showForm && (
        <>
          <CreateModal baseUrl={options.baseUrl} isOpen={modalCreate} onClose={() => setModalCreate(false)} />

          <UpdateModal
            baseUrl={options.baseUrl}
            isOpen={modalUpdate.isOpen}
            data={modalUpdate?.data}
            onClose={() => setModalUpdate({ ...modalUpdate, isOpen: false, data: null })}
          />
        </>
      )}
    </div>
  );
};
