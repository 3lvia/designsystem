import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Timepicker } from '../../react';

const defaultValue = new Date(2023, 5, 5, 12, 30, 0);

test.use({ viewport: { width: 500, height: 800 } });

test('should render', async ({ mount }) => {
  const component = await mount(<Timepicker />);
  await expect(component).toBeAttached();
});

test('should look closed', async ({ mount, page }) => {
  await mount(
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'row', flexWrap: 'wrap' }}>
        <Timepicker />
        <Timepicker isDisabled />
        <Timepicker errorOptions={{ isErrorState: true, text: 'Error text' }} />
      </div>
      <Timepicker isFullWidth />
      <div style={{ display: 'flex', gap: '16px', flexDirection: 'row', flexWrap: 'wrap' }}>
        <Timepicker size="small" />
        <Timepicker size="small" isDisabled />
        <Timepicker size="small" errorOptions={{ isErrorState: true, text: 'Error text' }} />
      </div>
      <Timepicker size="small" isFullWidth />
    </div>,
  );
  await percySnapshot(page, 'Timepicker: closed');
});

test('should look opened', async ({ mount, page }) => {
  const component = await mount(<Timepicker value={defaultValue} />);
  await component.getByTestId('popover-toggle').click();
  await percySnapshot(page, 'Timepicker: open');
});
