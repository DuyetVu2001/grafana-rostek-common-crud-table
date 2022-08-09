import { Button, Checkbox, ClickOutsideWrapper, HorizontalGroup, useTheme2, VerticalGroup } from '@grafana/ui';
import { SELECT_7_DAY_LATER, SELECT_7_DAY_LATER_TYPE } from 'const';
import { css, cx } from 'emotion';
import React from 'react';

export default function DownloadButton({}) {
  const theme = useTheme2();

  const [showPopup, setShowPopup] = React.useState(false);
  const [isCheckedAll, setIsCheckedAll] = React.useState(false);
  const [selectData, setSelectData] = React.useState<SELECT_7_DAY_LATER_TYPE[]>(
    JSON.parse(JSON.stringify(SELECT_7_DAY_LATER))
  );

  const ClickOutsideWrapperAnyType: any = ClickOutsideWrapper;

  function handleSubmit() {
    const submitData = selectData.filter((item) => item.isChecked).map((item) => item.value);

    console.log(submitData);
  }

  function handleCheckAll() {
    const updateCheckAll = !isCheckedAll;
    setIsCheckedAll(updateCheckAll);

    if (updateCheckAll) {
      setSelectData((prevState) => prevState.map((item) => ({ ...item, isChecked: true })));
    } else {
      setSelectData((prevState) => prevState.map((item) => ({ ...item, isChecked: false })));
    }
  }

  return (
    <div
      className={cx(css`
        position: relative;
      `)}
    >
      <ClickOutsideWrapperAnyType onClick={() => setShowPopup(false)}>
        <Button fill="outline" icon="download-alt" onClick={() => setShowPopup(!showPopup)}>
          Download
        </Button>

        {showPopup && (
          <div
            className={cx(
              css`
                position: absolute;
                right: 0;
                top: 38px;
                z-index: 1;

                min-width: 206px;

                padding: 12px;
                border: 1px solid ${theme.colors.border.medium};
                border-radius: 4px;

                box-shadow: ${theme.shadows.z3};
                background: ${theme.colors.background.primary};
              `
            )}
          >
            {/* body */}
            <div
              className={cx(css`
                margin-top: 12px;
                padding: 2px 6px;
              `)}
            >
              <VerticalGroup>
                <Checkbox onChange={handleCheckAll} label="Check all" value={isCheckedAll} />
                {selectData.map((item, index) => (
                  <Checkbox
                    key={index}
                    onChange={() =>
                      setSelectData((prevState) => {
                        prevState[index].isChecked = !prevState[index].isChecked;

                        setIsCheckedAll(false);

                        return [...prevState];
                      })
                    }
                    label={item.name}
                    value={item.isChecked}
                  />
                ))}
              </VerticalGroup>
            </div>

            {/* footer */}
            <div
              className={cx(css`
                margin-top: 18px;
              `)}
            >
              <HorizontalGroup>
                <Button size="sm" onClick={handleSubmit}>
                  Download
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setShowPopup(false)}>
                  Cancel
                </Button>
              </HorizontalGroup>
            </div>
          </div>
        )}
      </ClickOutsideWrapperAnyType>
    </div>
  );
}
