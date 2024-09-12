import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { SegmentedControl, type SegmentedControlProps } from '../../react';

const items: SegmentedControlProps['items'] = [
  { label: 'Weekly' },
  { label: 'Monthly' },
  { label: 'Yearly' },
];

const iconItems: SegmentedControlProps['items'] = [
  {
    icon: '<i class="e-icon e-icon--thumbnail"></i>',
    iconSelected: '<i class="e-icon e-icon--thumbnail-color"></i>',
    ariaLabel: 'label',
  },
  {
    icon: '<i class="e-icon e-icon--list"></i>',
    iconSelected: '<i class="e-icon e-icon--list-color"></i>',
    ariaLabel: 'label',
  },
  {
    icon: '<i class="e-icon e-icon--calendar"></i>',
    iconSelected: '<i class="e-icon e-icon--calendar-color"></i>',
    ariaLabel: 'label',
  },
];

test.use({ viewport: { width: 500, height: 800 } });

test('should render', async ({ mount }) => {
  const component = await mount(<SegmentedControl items={items} />);
  await expect(component).toBeAttached();
});

test('segmented-control screenshots', async ({ mount, page }) => {
  await mount(
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <SegmentedControl items={items} size="large" />
      <SegmentedControl items={items} />
      <SegmentedControl items={items} size="small" />
      <SegmentedControl items={items} value={1} size="large" />
      <SegmentedControl items={items} value={1} />
      <SegmentedControl items={items} value={1} size="small" />
      <SegmentedControl type="icon" items={iconItems} size="large" />
      <SegmentedControl type="icon" items={iconItems} />
      <SegmentedControl type="icon" items={iconItems} size="small" />
      <SegmentedControl type="icon" items={iconItems} value={1} size="large" />
      <SegmentedControl type="icon" items={iconItems} value={1} />
      <SegmentedControl type="icon" items={iconItems} value={1} size="small" />
    </div>,
  );
  // wait for animations to finish
  await page.waitForTimeout(500);
  await percySnapshot(page, 'Segmented-Control');
});
