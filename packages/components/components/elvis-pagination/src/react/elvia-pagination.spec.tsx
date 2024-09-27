import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Pagination } from '../../react';

test.use({ viewport: { width: 750, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(<Pagination />);
  await expect(component).toBeAttached();
});

test('should look correct', async ({ mount, page }) => {
  const components = await mount(
    <div style={{ display: 'flex', gap: '32px', flexDirection: 'column' }}>
      <Pagination alignment={'right'} numberOfElements={50} />
      <Pagination numberOfElements={25} />
      <Pagination numberOfElements={2500} />
      <Pagination numberOfElements={50000} />
    </div>,
  );

  await components.getByLabel(/select page 5000/i).click(); //click last page button to test layout
  await percySnapshot(page, 'Paginator');
});
