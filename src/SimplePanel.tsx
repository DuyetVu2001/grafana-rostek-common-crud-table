import React, { useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import {
  Button,
  stylesFactory,
  // useTheme
} from '@grafana/ui';
import CreateModal from 'components/CreateModal';
import UpdateModal from 'components/UpdateModal';

interface Props extends PanelProps<SimpleOptions> {}

const rotate90Degree2DArray = (arr: [any][any]) => {
  const newArr = [];

  for (let i = 0; i < arr[0].length; i++) {
    const newRow = [];

    for (let j = arr.length - 1; j >= 0; j--) {
      newRow.push(arr[j][i]);
    }
    newArr.push(newRow.reverse());
  }

  return newArr;
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [modalCreate, setModalCreate] = useState(false);
  const [modalUpdate, setModalUpdate] = useState({
    isOpen: false,
    data: null as any,
  });

  // const theme = useTheme();
  const styles = getStyles();

  let headers: any[] = [];
  let keys: any[] = [];

  if (data.series[0] && data.series[0].fields) {
    headers = data.series[0].fields.map((field) => field.config?.displayName || field.name);
    keys = data.series[0].fields.map((field) => field.name);
  }

  let coloumns: any[][] = [];

  if (data.series[0] && data.series[0].fields) {
    coloumns = data.series[0].fields.map((field) => field.values.toArray());

    coloumns = rotate90Degree2DArray(coloumns);
  }

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
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

      <div
        className={cx(css`
          height: ${height - 60}px;
          overflow: auto;
        `)}
      >
        <table className={cx(styles.table)}>
          <tr
            className={cx(css`
              background: rgb(34, 37, 43);
            `)}
          >
            {headers.length > 0 &&
              headers.map((header) => (
                <th
                  key={header}
                  className={css`
                    border: 1px solid rgba(204, 204, 220, 0.07);
                    text-align: left;
                    padding: 6px;
                    color: #6e9fff;
                  `}
                >
                  {header}
                </th>
              ))}
          </tr>

          {coloumns.length > 0 &&
            coloumns.map((record, index1) => (
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
                onClick={() => {
                  const data: any = {};
                  keys.forEach((key, idx) => {
                    data[key] = record[idx];
                  });

                  setModalUpdate({
                    ...modalUpdate,
                    isOpen: true,
                    data,
                  });
                }}
              >
                {headers.map((_, index2) => (
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
                    {record[index2]}
                  </td>
                ))}
              </tr>
            ))}
        </table>
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

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,

    table: css`
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    `,

    cell: `
      border: 1px solid #dddddd;
      text-align: left;
      padding: 8px;
    `,

    row: `
      &:hover {
        background-color: #ddd;
        cursor: pointer;
      }
    `,

    createBtn: `
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10px;
    `,
  };
});
