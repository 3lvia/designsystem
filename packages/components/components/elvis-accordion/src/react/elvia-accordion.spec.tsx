import { test, expect } from '@playwright/experimental-ct-react';
import { Accordion } from '../../react';
import React from 'react';

test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(<Accordion openLabel="Open" closeLabel="Close" content={'test'} />);
  await expect(component).toBeAttached();
});

test('should look closed', async ({ mount }) => {
  const component = await mount(<Accordion openLabel="Open" closeLabel="Close" content={'test'} />);
  await expect(component).toHaveScreenshot();
});

test('should look opened', async ({ mount }) => {
  const component = await mount(<Accordion openLabel="Open" closeLabel="Close" content={'test'} />);
  await component.click();
  await expect(component).toHaveScreenshot();
});
