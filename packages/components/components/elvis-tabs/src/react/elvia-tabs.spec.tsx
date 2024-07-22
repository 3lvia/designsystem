import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Tabs, type TabsProps } from '../../react';

const items: TabsProps['items'] = ['Oranges', 'Apples', 'Pears'];

test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(<Tabs items={items} />);
  await expect(component).toBeAttached();
});

test('tabs screenshots', async ({ mount, page }) => {
  await mount(
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <Tabs items={items} />
      <Tabs items={items} value={1} />
    </div>,
  );
  await percySnapshot(page, 'Tabs');
});
