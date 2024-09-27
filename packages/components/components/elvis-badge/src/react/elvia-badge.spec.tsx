import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Badge } from '../../react';
import { BadgeColor } from './elvia-badge.types';

test.use({ viewport: { width: 500, height: 500 } });

const colors: BadgeColor[] = [
  'green',
  'red',
  'orange',
  'neutral',
  'data-1',
  'data-2',
  'data-3',
  'data-4',
  'data-5',
  'data-6',
];

test('should render', async ({ mount }) => {
  const component = await mount(<Badge />);
  await expect(component).toBeAttached();
});

test('should look correct with all colors', async ({ mount, page }) => {
  await mount(
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', margin: '16px' }}>
      {colors.map((color) => (
        <Badge
          badgeColor={color}
          content={<div style={{ height: '32px', aspectRatio: 1, border: '1px solid black' }}></div>}
          count={1}
          key={color}
        />
      ))}
      {colors.map((color) => (
        <Badge
          badgeColor={color}
          content={<div style={{ height: '32px', aspectRatio: 1, border: '1px solid black' }}></div>}
          count={100}
          key={color}
        />
      ))}
    </div>,
  );
  await percySnapshot(page, 'Badge: all colors');
});
