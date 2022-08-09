import {
  Button,
  Checkbox,
  ClickOutsideWrapper,
  HorizontalGroup,
  InlineField,
  InlineSwitch,
  Input,
  useTheme2,
  VerticalGroup,
} from '@grafana/ui';
import { SELECT_7_DAY_LATER, SELECT_7_DAY_LATER_TYPE } from 'const';
import { css, cx } from 'emotion';
import React from 'react';

export default function AutoReportButton({}) {
  const theme = useTheme2();

  const [showPopup, setShowPopup] = React.useState(false);
  const [isCheckedAll, setIsCheckedAll] = React.useState(false);
  const [isAutoReport, setIsAutoReport] = React.useState(true);

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
        <Button fill="outline" icon="sync" onClick={() => setShowPopup(!showPopup)}>
          Auto report
        </Button>

        {/* POPUP */}
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
            {/* header */}
            {/* <div
              className={cx(css`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `)}
            ></div> */}
            <InlineField label="Report time" style={{ flex: 1, padding: '0 2px' }}>
              <Input type="number" min={0} max={24} />
            </InlineField>

            <InlineSwitch
              label="Auto report?"
              onClick={() => setIsAutoReport((prev) => !prev)}
              showLabel={true}
              value={isAutoReport}
              transparent={false}
            />

            {/* body */}
            {!isAutoReport && (
              <div
                className={cx(css`
                  margin-top: 12px;
                  padding: 2px 6px;
                  max-height: 138px;

                  overflow-y: auto;
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
            )}

            {/* footer */}
            <div
              className={cx(css`
                margin-top: 18px;
              `)}
            >
              <HorizontalGroup>
                <Button size="sm" onClick={handleSubmit}>
                  Save
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
