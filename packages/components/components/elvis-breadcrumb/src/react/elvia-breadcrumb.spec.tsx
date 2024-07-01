import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Breadcrumb, type BreadcrumbProps } from '../../react';

const items: BreadcrumbProps['items'] = [
  { href: '#', text: 'Home' },
  { href: '#', text: 'Catalog' },
  { text: 'Product' },
];

test.use({ viewport: { width: 800, height: 250 } });

test('should render', async ({ mount }) => {
  const component = await mount(<Breadcrumb items={items} />);
  await expect(component).toBeAttached();
});

test('breadcrumb screenshots', async ({ mount, page }) => {
  await mount(<Breadcrumb items={items} />);
  await percySnapshot(page, 'Breadcrumb', { widths: [600, 1200] });
});
