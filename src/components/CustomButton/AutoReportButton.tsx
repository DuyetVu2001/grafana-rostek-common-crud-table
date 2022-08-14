import React from 'react';

import {
  Button,
  Checkbox,
  Field,
  HorizontalGroup,
  InlineSwitch,
  TimeOfDayPicker,
  useTheme2,
  VerticalGroup,
} from '@grafana/ui';
import { SELECT_7_DAY_OF_WEEK, SELECT_TYPE } from 'const';
import { css, cx } from 'emotion';

/*eslint no-restricted-imports: ["error", "fs"]*/
import moment from 'moment';

export default function AutoReportButton({}) {
  const theme = useTheme2();

  const [showPopup, setShowPopup] = React.useState(false);
  const [isCheckedAll, setIsCheckedAll] = React.useState(false);
  const [isAutoReport, setIsAutoReport] = React.useState(true);
  const [pickTime, setPickTime] = React.useState<any>();

  const [selectData, setSelectData] = React.useState<SELECT_TYPE[]>(JSON.parse(JSON.stringify(SELECT_7_DAY_OF_WEEK)));

  function handleSubmit() {
    const time = moment(pickTime).format('HH:mm');
    const hour = time.split(':')[0];
    const minute = time.split(':')[1];
    let days = [];

    if (isAutoReport) {
      days = selectData.map((item) => item.value);
    } else {
      days = selectData.filter((item) => item.isChecked).map((item) => item.value);
    }

    const body = {
      originTime: pickTime,
      hour,
      minute,
      dow: days,
    };

    console.log(body);
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
          <Field label="Report time" style={{ flex: 1, padding: '0 2px' }}>
            <TimeOfDayPicker onChange={(newValue: any) => setPickTime(newValue.toISOString())} value={pickTime} />
          </Field>

          <InlineSwitch
            label="Auto report"
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
    </div>
  );
}
