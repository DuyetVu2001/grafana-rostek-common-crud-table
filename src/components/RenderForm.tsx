import React from 'react';

import { Field, Input, Select } from '@grafana/ui';
import _ from 'lodash';

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
                    value={formData[input.name] || input?.data[0] || ''}
                    onChange={(value) => handleChange(value.value, input.name)}
                  />
                </Field>
              );

            default:
              return (
                <Field required disabled={input.disabled} style={{ width: '100%' }} label={input.label}>
                  <Input required type="text" name={input.name} value={formData[input.name]} onChange={handleChange} />
                </Field>
              );
          }
        })}
    </>
  );
};
