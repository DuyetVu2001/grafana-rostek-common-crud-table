import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'baseUrl',
      name: 'Base url',
      description: 'Example: http://localhost:8080/users',
    })
    .addBooleanSwitch({
      path: 'isRenderTableDataFromUrl',
      name: 'Render data from url?',
      description: 'Default: render data from data source',

      defaultValue: false,
    });
});
