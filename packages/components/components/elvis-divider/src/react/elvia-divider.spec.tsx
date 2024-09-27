import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Divider } from '../../react';

test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(<Divider />);
  await expect(component).toBeAttached();
});

test('should look as expected', async ({ mount, page }) => {
  await mount(
    <div style={{ display: 'flex', gap: '48px', flexDirection: 'column' }}>
      <Divider type={'simple'} orientation={'horizontal'} />
      <Divider type={'heading'} heading={'Hva er nettleie?'} typography={'medium'} />
      <Divider type={'curved'} />
    </div>,
  );
  await percySnapshot(page, 'Divider');
});
