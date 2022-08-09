import React from 'react';

import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';

import TableDataProvider from 'contexts/TableDataProvider';
import { TablePanel } from 'containers/TablePanel';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = (props) => {
  return (
    <TableDataProvider>
      <TablePanel {...props} />
    </TableDataProvider>
  );
};
