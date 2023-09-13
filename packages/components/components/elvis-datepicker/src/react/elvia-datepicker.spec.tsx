import { test, expect } from '@playwright/experimental-ct-react';
import { Datepicker } from '../../react';
import React from 'react';

test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(<Datepicker />);
  await expect(component).toBeAttached();
});

test('should look closed', async ({ mount, page }) => {
  await mount(<Datepicker />);
  await expect(page).toHaveScreenshot();
});

test('should look opened', async ({ mount, page }) => {
  const component = await mount(<Datepicker value={new Date(2023, 5, 5)} />);
  await component.getByTestId('popover-toggle').click();
  await expect(page).toHaveScreenshot();
});
