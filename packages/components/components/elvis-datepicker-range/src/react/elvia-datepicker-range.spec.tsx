import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { DatepickerRange } from '../../react';

test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(<DatepickerRange />);
  await expect(component).toBeAttached();
});

test('should look closed', async ({ mount, page }) => {
  await mount(
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <DatepickerRange />
      <DatepickerRange isFullWidth />
      <DatepickerRange hasTimepickers />
      <DatepickerRange isDisabled />
      <DatepickerRange isVertical />
      <DatepickerRange size="small" />
      <DatepickerRange size="small" hasTimepickers />
      <DatepickerRange size="small" isDisabled />
      <DatepickerRange size="small" isVertical />
    </div>,
  );
  await percySnapshot(page, 'Datepicker-range: closed');
});

test('should look focused', async ({ mount, page }) => {
  const component = await mount(<DatepickerRange size="small" hasTimepickers />);
  await component.getByLabel(/fra dato/i).focus();
  await percySnapshot(page, 'Datepicker-range: focused');
});

test('should look opened', async ({ mount, page }) => {
  const component = await mount(
    <DatepickerRange value={{ start: new Date(2023, 5, 5), end: new Date(2023, 5, 22) }} />,
  );
  await component.getByTestId('popover-toggle').first().click();
  await percySnapshot(page, 'Datepicker-range: open');
});
