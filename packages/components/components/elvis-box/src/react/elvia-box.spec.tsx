import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Box } from '../../react';

test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(<Box content={<p>hello, world</p>} />);
  await expect(component).toBeAttached();
});

test('should look as expected', async ({ mount, page }) => {
  await mount(
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <Box content={<p>hip</p>}></Box>
      <Box isColored content={<p>hip</p>}></Box>
      <Box heading={'heading'} content={<p>hooray! 🎉</p>}></Box>
    </div>,
  );
  await percySnapshot(page, 'Box');
});
