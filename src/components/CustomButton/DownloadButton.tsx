import React from 'react';

import { Button, Checkbox, ClickOutsideWrapper, HorizontalGroup, useTheme2, VerticalGroup } from '@grafana/ui';
import { SELECT_TYPE } from 'const';
import { css, cx } from 'emotion';

/*eslint no-restricted-imports: ["error", "fs"]*/
import moment from 'moment';
import axios from 'axios';
// import { saveFileAs } from 'utils/fs-helper';

export default function DownloadButton({ baseUrl }: { baseUrl: string }) {
  const theme = useTheme2();

  const [showPopup, setShowPopup] = React.useState(false);
  const [isCheckedAll, setIsCheckedAll] = React.useState(false);
  const [selectData, setSelectData] = React.useState<SELECT_TYPE[]>([]);

  const ClickOutsideWrapperAnyType: any = ClickOutsideWrapper;

  // set select the seven latest days
  React.useEffect(() => {
    const selects = [0, 1, 2, 3, 4, 5, 6].map((item) => {
      const date = moment().subtract(item, 'days');
      const value = date.format('DD-MM-YYYY');
      let name = date.format('DD-MM-YYYY');

      if (item === 0) {
        name = 'Hôm nay';
      }

      return { value, name, isChecked: false };
    });

    setSelectData(selects);
  }, []);

  async function handleSubmit() {
    try {
      const submitData = selectData.filter((item) => item.isChecked).map((item) => item.value);
      if (submitData?.length <= 0) {
        return;
      }

      const queries = submitData.join('&days=');

      const randomNumber = Math.floor(Math.random() * 9999);
      // const response = await axios.get(`${baseUrl}/get-report/${randomNumber}?days=${queries}`);
      // const content = response.data;
      // await saveFileAs(content);

      axios({
        url: `${baseUrl}/get-report/${randomNumber}?days=${queries}`, //your url
        method: 'GET',
        responseType: 'arraybuffer',
      }).then((response) => {
        const type = response.headers['content-type'];
        const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' } as any);

        const link = document.createElement('a');
        const href = window.URL.createObjectURL(blob);

        // const suggestedName = moment().format('DD-MM-YYYY-(HH:mm)') + '-manual-report';

        link.href = href;
        link.download = response.headers?.['content-disposition']?.split('filename=')[1] || 'report.xlsx';
        link.click();

        // clean up "a" element & remove ObjectURL
        document.body.removeChild(link);
        window.URL.revokeObjectURL(href);
      });
    } catch (error: any) {
      alert(error.response?.data?.message || error.message);
    } finally {
      setShowPopup(false);
    }
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
