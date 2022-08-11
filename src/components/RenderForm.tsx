import React from 'react';

import { Field, Input, Select } from '@grafana/ui';
import { css, cx } from 'emotion';
import _ from 'lodash';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/*eslint no-restricted-imports: ["error", "fs"]*/
import moment from 'moment';

type Props = {
  listInputs: any[];
  formData: any;

  setFormData: (data: any) => void;
};

export const RenderForm = ({ listInputs, formData = {}, setFormData }: Props) => {
  const handleChange = (e: any, name = '') => {
    let key = e?.target?.name;
    let value = e?.target?.value;

    if (!_.isEmpty(name)) {
      key = name;
      value = e;
    }

    setFormData((prevState: any) => ({
      ...prevState,
      [key]: value,
    }));
  };

  return (
    <>
      {listInputs.length > 0 &&
        listInputs.map((input: any) => {
          switch (input.type) {
            case 'number':
              return (
                <Field required disabled={input.disabled} style={{ width: '100%' }} label={input.label}>
                  <Input
                    required
                    type="number"
                    name={input.name}
                    value={formData[input.name] || ''}
                    onChange={handleChange}
                  />
                </Field>
              );

            case 'password':
              return (
                <Field required disabled={input.disabled} style={{ width: '100%' }} label={input.label}>
                  <Input
                    required
                    type="password"
                    name={input.name}
                    value={formData[input.name] || ''}
                    onChange={handleChange}
                  />
                </Field>
              );

            case 'select':
              // set default value is first option of select
              if (formData[input.name] === undefined || formData[input.name] === null) {
                setFormData({
                  ...formData,
                  [input.name]: input?.data[0].id ?? input?.data[0].name,
                });
              }

              return (
                <Field
                  required
                  error="Please fill this filed"
                  disabled={input.disabled}
                  style={{ width: '100%' }}
                  label={input.label}
                >
                  <Select
                    options={input?.data?.map((item: any) => ({
                      ...item,
                      value: item.id ?? item.name,
                    }))}
                    allowCustomValue
                    value={formData[input.name] ?? input?.data[0] ?? ''}
                    onChange={(value) => handleChange(value.value, input.name)}
                  />
                </Field>
              );

            case 'date':
              return (
                <Field
                  required
                  error="Please fill this filed"
                  disabled={input.disabled}
                  style={{ width: '100%' }}
                  label={input.label}
                >
                  <div
                    className={cx(
                      css`
                        position: relative;
                        z-index: 686;

                        & input {
                          padding: 0 8px;
                          line-height: 32px;
                          border: 1px solid rgba(204, 204, 220, 0.15);
                          border-radius: 2px;
                        }

                        /* & input:focus {
                          outline-offset: 2px;
                          box-shadow: rgb(17 18 23) 0px 0px 0px 2px, rgb(61 113 217) 0px 0px 0px 4px;
                        } */
                      `
                    )}
                  >
                    <DatePicker
                      required
                      selected={formData[input.name] ? moment(formData[input.name], 'X').toDate() : null}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => {
                        // check date is instance of Date

                        if (date instanceof Date) {
                          const timestamp = moment(date).format('X');

                          handleChange(timestamp, input.name);
                        }
                      }}
                    />
                  </div>
                </Field>
              );

            default:
              return (
                <Field required disabled={input.disabled} style={{ width: '100%' }} label={input.label}>
                  <Input
                    required
                    type="text"
                    name={input.name}
                    value={formData[input.name] || ''}
                    onChange={handleChange}
                  />
                </Field>
              );
          }
        })}
    </>
  );
};
