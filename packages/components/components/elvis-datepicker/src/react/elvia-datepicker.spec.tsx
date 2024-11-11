import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Datepicker } from '../../react';

test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(<Datepicker />);
  await expect(component).toBeAttached();
});

test('should look closed', async ({ mount, page }) => {
  await mount(
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <Datepicker />
      <Datepicker isDisabled />
      <Datepicker isFullWidth />
      <Datepicker size="small" />
      <Datepicker size="small" isDisabled />
    </div>,
  );
  await percySnapshot(page, 'Datepicker: closed');
});

test('should look opened', async ({ mount, page }) => {
  const component = await mount(<Datepicker value={new Date(2023, 5, 5)} />);
  await component.getByTestId('popover-toggle').click();
  await percySnapshot(page, 'Datepicker: open');
});

test('should have year view open', async ({ mount, page }) => {
  const component = await mount(<Datepicker value={new Date(2023, 5, 5)} />);
  await component.getByTestId('popover-toggle').click();
  await page.getByTestId('year-view-toggle').click();
  await percySnapshot(page, 'Datepicker: open year view');
});

test('should look correct when invalid', async ({ mount, page }) => {
  await mount(<Datepicker value={new Date(2024, 0, 2)} maxDate={new Date(2024, 0, 1)} />);
  await percySnapshot(page, 'Datepicker: invalid');
});
