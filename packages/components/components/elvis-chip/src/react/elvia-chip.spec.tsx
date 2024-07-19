import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Chip, ColorType } from '../../react';

test.use({ viewport: { width: 300, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(<Chip value="Chip" />);
  await expect(component).toBeAttached();
});

test('should pass visual diff check', async ({ mount, page }) => {
  await mount(
    <div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
        <Chip value="Chip" type="choice" isSelected />
        <Chip color="green" value="Green" type="legend" isSelected />
        <Chip color="blue" value="Blue" type="legend" isSelected />
        <Chip color="orange" value="Orange" type="legend" isSelected />
        <Chip color="purple" value="Purple" type="legend" isSelected />
        <Chip color="red" value="Red" type="legend" isSelected />
        <Chip color="violet" value="Violet" type="legend" isSelected />
        <Chip value="Chip" type="legend" isSelected />

        <Chip value="Removable" type="removable" />
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {['green', 'blue', 'orange'].map((color: ColorType) => (
          <div key={color} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Chip color={color} value="Dot" type="legend" isSelected markerStyle="dot" />
            <Chip color={color} value="Line" type="legend" isSelected markerStyle="line" />
            <Chip color={color} value="Dashed" type="legend" isSelected markerStyle="dashed" />
          </div>
        ))}
      </div>
    </div>,
  );
  await percySnapshot(page, 'Chips');
});
