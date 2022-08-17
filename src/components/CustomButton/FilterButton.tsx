import React from 'react';

import {
  // ClickOutsideWrapper,
  IconButton,
  useTheme2,
} from '@grafana/ui';
import { css, cx } from 'emotion';
import { TableDataContext } from 'contexts/TableDataProvider';

type Props = {
  showFilter: boolean;
  columnKey: any;

  openFilter: () => void;
  renderFilterModal: () => JSX.Element;
};

export default function FilterButton({ showFilter, columnKey, renderFilterModal, openFilter }: Props) {
  const theme = useTheme2();
  const { query } = React.useContext(TableDataContext);

  const [isFilterActive, setIsFilterActive] = React.useState(false);

  React.useEffect(() => {
    if (columnKey && query[columnKey]) {
      let isActive = false;

      // check if is an array
      if (query[columnKey].type === 'select') {
        query[columnKey].list?.forEach((item: any) => {
          if (item.isChecked) {
            isActive = true;
          }
        });
      }
      // check with not array like number or string value
      else if (
        query[columnKey].type !== 'select' &&
        (query[columnKey].value || query[columnKey].from || query[columnKey].to)
      ) {
        isActive = true;
      }

      setIsFilterActive(isActive);
    }
  }, [query, columnKey]);

  // const ClickOutsideWrapperAnyType: any = ClickOutsideWrapper;

  return (
    <div
      className={cx(css`
        position: relative;
      `)}
    >
      {/* <ClickOutsideWrapperAnyType onClick={() => setIsOpen(false)}> */}
      <div
        className={cx(css`
          display: flex;
        `)}
      >
        <IconButton
          name="filter"
          {...(isFilterActive ? { variant: 'primary' } : { variant: 'secondary' })}
          onClick={() => openFilter()}
        />
      </div>

      {showFilter && (
        <div
          className={cx(
            css`
              position: absolute;
              left: 0;
              top: 32px;

              min-width: 248px;
              max-height: 356px;

              padding: 12px;
              border: 1px solid ${theme.colors.border.medium};
              border-radius: 4px;

              box-shadow: ${theme.shadows.z3};
              background: ${theme.colors.background.primary};
            `
          )}
        >
          {renderFilterModal()}
        </div>
      )}
      {/* </ClickOutsideWrapperAnyType> */}
    </div>
  );
}
