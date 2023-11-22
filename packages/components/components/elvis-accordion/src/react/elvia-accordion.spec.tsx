import { test, expect } from '@playwright/experimental-ct-react';
import percySnapshot from '@percy/playwright';
import { Accordion } from '../../react';
import React from 'react';

test.use({ viewport: { width: 500, height: 150 } });

test('should render', async ({ mount }) => {
  const component = await mount(<Accordion openLabel="Open" closeLabel="Close" content={'test'} />);
  await expect(component).toBeAttached();
});

test('should look closed', async ({ mount, page }) => {
  await mount(<Accordion openLabel="Open" closeLabel="Close" content={'test'} />);
  await percySnapshot(page, 'Closed accordion');
});

test('should look opened', async ({ mount, page }) => {
  const component = await mount(<Accordion openLabel="Open" closeLabel="Close" content={'test'} />);
  await component.click();
  await percySnapshot(page, 'Open accordion');
});
