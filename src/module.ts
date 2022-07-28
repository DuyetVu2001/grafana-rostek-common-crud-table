import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'postUrl',
      name: 'Post url',
      description: '.../post',
    })
    .addTextInput({
      path: 'patchUrl',
      name: 'Patch url',
      description: '.../patch',
    });
});
