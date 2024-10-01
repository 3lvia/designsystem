import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { AppBridge } from '../../react';

test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(<AppBridge targetId="1" />);
  await expect(component).toBeAttached();
});

test('should look closed', async ({ mount, page }) => {
  await mount(<AppBridge targetId="1" />);
  await percySnapshot(page, 'AppBridge: closed');
});

test('should look opened', async ({ mount, page }) => {
  const component = await mount(<AppBridge targetId="1" />);
  await component.getByRole('button').click();
  await percySnapshot(page, 'AppBridge: open');
});
