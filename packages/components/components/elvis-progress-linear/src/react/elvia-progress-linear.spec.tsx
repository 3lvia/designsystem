import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { ProgressLinear } from '../../react';

test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(<ProgressLinear value={40} />);
  await expect(component).toBeAttached();
});

test('should look as expected', async ({ mount, page }) => {
  await mount(
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <ProgressLinear size={'small'} value={10} />
      <ProgressLinear size={'medium'} value={20} />
      <ProgressLinear size={'large'} value={30} />
      <ProgressLinear value={40} isError />
    </div>,
  );
  await percySnapshot(page, 'ProgressLinear');
});
