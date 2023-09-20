import { test, expect } from '@playwright/experimental-ct-react';
import { Chip } from '../../react';
import React from 'react';
import { ToHaveScreenshotConfig } from '../../../../playwright-ct.config';

test.use({ viewport: { width: 130, height: 70 } });

const config: ToHaveScreenshotConfig = undefined; // { maxDiffPixelRatio: 0 };

test('should render', async ({ mount }) => {
  const component = await mount(<Chip value="Chip" />);
  await expect(component).toBeAttached();
});

test('should be type choice', async ({ mount, page }) => {
  await mount(<Chip value="Chip" type="choice" isSelected />);
  await expect(page).toHaveScreenshot(config);
});

test.describe('should have color', () => {
  test('green', async ({ mount, page }) => {
    await mount(<Chip color="green" value="Chip" type="legend" isSelected />);
    await expect(page).toHaveScreenshot(config);
  });
  test('blue', async ({ mount, page }) => {
    await mount(<Chip color="blue" value="Chip" type="legend" isSelected />);
    await expect(page).toHaveScreenshot(config);
  });
  test('orange', async ({ mount, page }) => {
    await mount(<Chip color="orange" value="Chip" type="legend" isSelected />);
    await expect(page).toHaveScreenshot(config);
  });
  test('purple', async ({ mount, page }) => {
    await mount(<Chip color="purple" value="Chip" type="legend" isSelected />);
    await expect(page).toHaveScreenshot(config);
  });
  test('red', async ({ mount, page }) => {
    await mount(<Chip color="red" value="Chip" type="legend" isSelected />);
    await expect(page).toHaveScreenshot(config);
  });
  test('violet', async ({ mount, page }) => {
    await mount(<Chip color="violet" value="Chip" type="legend" isSelected />);
    await expect(page).toHaveScreenshot(config);
  });
});

test('should be type legend', async ({ mount, page }) => {
  await mount(<Chip value="Chip" type="legend" isSelected />);
  await expect(page).toHaveScreenshot(config);
});

test('should be type removable', async ({ mount, page }) => {
  await mount(<Chip value="Chip" type="removable" />);
  await expect(page).toHaveScreenshot(config);
});
