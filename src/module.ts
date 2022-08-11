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
    })
    .addBooleanSwitch({
      path: 'isPagination',
      name: 'Show pagination?',

      defaultValue: true,
    })
    .addNumberInput({
      path: 'limitPerPage',
      name: 'Record per page',
      defaultValue: 8,
      settings: {
        min: 6,
      },
      showIf: (options) => options.isPagination,
    })
    .addBooleanSwitch({
      path: 'showErrorBackground',
      name: 'Show error background?',
      description: 'Default: false',

      defaultValue: false,
    })
    .addBooleanSwitch({
      path: 'showForm',
      name: 'Show form?',
      description: 'Show form create, update?',

      defaultValue: false,
    })
    .addBooleanSwitch({
      path: 'showReportButton',
      name: 'Show report button?',
      description: 'Show report button?',

      defaultValue: false,
    });
});
