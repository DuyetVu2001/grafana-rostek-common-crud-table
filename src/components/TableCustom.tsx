import React from 'react';

import { css, cx } from 'emotion';
import { ColumnTypes, HeaderTypes } from 'types';

/*eslint no-restricted-imports: ["error", "fs"]*/
import moment from 'moment';

type Props = {
  headers: HeaderTypes[] | [];
  columns: ColumnTypes[] | [];

  handleClickRow?: (row: any) => void;
};

export default function TableCustom({ headers = [], columns = [], handleClickRow = () => {} }: Props) {
  return (
    <table
      className={cx(css`
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      `)}
    >
      <tr
        className={cx(css`
          background: rgb(34, 37, 43);
        `)}
      >
        {headers.length > 0 &&
          headers.map(({ title }, index) => (
            <th
              key={index}
              className={css`
                border: 1px solid rgba(204, 204, 220, 0.07);
                text-align: left;
                padding: 6px;
                color: #6e9fff;
              `}
            >
              {title}
            </th>
          ))}
      </tr>

      {columns.length > 0 &&
        columns.map((record, index1) => (
          <tr
            className={cx(
              css`
                &:hover {
                  background-color: rgb(30, 33, 37);
                  cursor: pointer;
                }
              `
            )}
            key={index1}
            onClick={() => handleClickRow(record)}
          >
            {headers.map(({ key, type, format }, index2) => (
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
                {type === 'date' ? moment(record[key], 'X').format(format) : record[key]}
              </td>
            ))}
          </tr>
        ))}
    </table>
  );
}
