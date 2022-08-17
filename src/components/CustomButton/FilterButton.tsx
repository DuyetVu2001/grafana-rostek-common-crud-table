import React from 'react';

import {
  // ClickOutsideWrapper,
  IconButton,
  useTheme2,
} from '@grafana/ui';
import { css, cx } from 'emotion';

type Props = {
  showFilter: boolean;

  openFilter: () => void;
  renderFilterModal: () => JSX.Element;
};

export default function FilterButton({ showFilter, renderFilterModal, openFilter }: Props) {
  const theme = useTheme2();

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
        <IconButton name="filter" onClick={() => openFilter()} />
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
