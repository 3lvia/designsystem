import { test, expect } from '@playwright/experimental-ct-react';
import percySnapshot from '@percy/playwright';
import { Chip } from '../../react';
import React from 'react';

test.use({ viewport: { width: 130, height: 70 } });

test('should render', async ({ mount }) => {
  const component = await mount(<Chip value="Chip" />);
  await expect(component).toBeAttached();
});

test('should be type choice', async ({ mount, page }) => {
  await mount(<Chip value="Chip" type="choice" isSelected />);
  await percySnapshot(page, 'Choice chip');
});

test.describe('should have color', () => {
  test('green', async ({ mount, page }) => {
    await mount(<Chip color="green" value="Chip" type="legend" isSelected />);
    await percySnapshot(page, 'Green chip');
  });
  test('blue', async ({ mount, page }) => {
    await mount(<Chip color="blue" value="Chip" type="legend" isSelected />);
    await percySnapshot(page, 'Blue chip');
  });
  test('orange', async ({ mount, page }) => {
    await mount(<Chip color="orange" value="Chip" type="legend" isSelected />);
    await percySnapshot(page, 'Orange chip');
  });
  test('purple', async ({ mount, page }) => {
    await mount(<Chip color="purple" value="Chip" type="legend" isSelected />);
    await percySnapshot(page, 'Purple chip');
  });
  test('red', async ({ mount, page }) => {
    await mount(<Chip color="red" value="Chip" type="legend" isSelected />);
    await percySnapshot(page, 'Red chip');
  });
  test('violet', async ({ mount, page }) => {
    await mount(<Chip color="violet" value="Chip" type="legend" isSelected />);
    await percySnapshot(page, 'Violet chip');
  });
});

test('should be type legend', async ({ mount, page }) => {
  await mount(<Chip value="Chip" type="legend" isSelected />);
  await percySnapshot(page, 'Legend chip');
});

test('should be type removable', async ({ mount, page }) => {
  await mount(<Chip value="Chip" type="removable" />);
  await percySnapshot(page, 'Removable chip');
});
