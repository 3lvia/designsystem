import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Chip } from '../../react';

test.use({ viewport: { width: 130, height: 70 } });

test('should render', async ({ mount }) => {
  const component = await mount(<Chip value="Chip" />);
  await expect(component).toBeAttached();
});

test('should pass visual diff check', async ({ mount, page }) => {
  await mount(
    <div
      style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))' }}
    >
      <Chip value="Chip" type="choice" isSelected />
      <Chip color="green" value="Chip" type="legend" isSelected />
      <Chip color="blue" value="Chip" type="legend" isSelected />
      <Chip color="orange" value="Chip" type="legend" isSelected />
      <Chip color="purple" value="Chip" type="legend" isSelected />
      <Chip color="red" value="Chip" type="legend" isSelected />
      <Chip color="violet" value="Chip" type="legend" isSelected />
      <Chip value="Chip" type="legend" isSelected />
      <Chip value="Chip" type="removable" />
    </div>,
  );
  await percySnapshot(page, 'Chips');
});
