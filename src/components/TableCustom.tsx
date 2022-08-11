import React from 'react';

import { css, cx } from 'emotion';
import { HeaderTypes } from 'types';

/*eslint no-restricted-imports: ["error", "fs"]*/
import moment from 'moment';
import { HorizontalGroup } from '@grafana/ui';
import FilterModal from './FilterModal';
import { TableDataContext } from 'contexts/TableDataProvider';

type Props = {
  headers: HeaderTypes[] | [];
  showErrorBackground?: boolean;

  handleClickRow?: (row: any) => void;
};

export default function TableCustom({ headers = [], showErrorBackground = false, handleClickRow = () => {} }: Props) {
  const { filterColumns } = React.useContext(TableDataContext);

  const renderRecords = (record: any, header: HeaderTypes) => {
    const type = header?.type || '';

    switch (type) {
      case 'date':
        return moment(record[header.key], 'X').format(header.format);

      case 'select':
        return header.data?.find((item: any) => item.id === record[header.key] || item.name === record[header.key])
          ?.label;

      default:
        return record[header.key];
    }
  };

  return (
    <table
      className={cx(css`
        position: relative;
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      `)}
    >
      <thead
        className={cx(css`
          position: sticky;
          top: 0;
          background: rgb(34, 37, 43);
        `)}
      >
        {/* HEADER */}
        {headers.length > 0 &&
          headers.map((header, index) => (
            <th
              key={index}
              className={css`
                /* border: 1px solid rgba(204, 204, 220, 0.07); */
                text-align: left;
                padding: 6px;
                color: #6e9fff;
              `}
            >
              <HorizontalGroup align="center">
                <span>{header.title}</span>
                {header.filter && (
                  <FilterModal.RenderFilter id={header.key} filterType={header.filterType} header={header} />
                )}
              </HorizontalGroup>
            </th>
          ))}
      </thead>

      {/* ROWS */}
      <tbody>
        {filterColumns.length > 0 &&
          filterColumns.map((record, index1) => (
            <tr
              className={cx(
                css`
                  &:hover {
                    background-color: rgb(30, 33, 37);
                    ${showErrorBackground && record['error_step'].toString() !== '0' && 'background-color: #D21123;'}
                    cursor: pointer;
                  }
                  ${showErrorBackground && record['error_step'].toString() !== '0' && 'background-color: #D21123;'}
                `
              )}
              key={index1}
              onClick={() => handleClickRow(record)}
            >
              {headers.map((header, index2) => (
                <td
                  key={`${index1}-${index2}`}
                  className={cx(
                    css`
                      border: 1px solid rgba(204, 204, 220, 0.07);
                      text-align: left;
                      padding: 6px;
                      font-weight: 600;
                    `
                  )}
                >
                  {renderRecords(record, header)}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
