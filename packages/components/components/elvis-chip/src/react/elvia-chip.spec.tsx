import { test, expect, defineConfig } from '@playwright/experimental-ct-react';
import { Chip } from '../../react';
import React from 'react';

test.use({ viewport: { width: 130, height: 70 } });

defineConfig({
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0,
    },
  },
});

test('should render', async ({ mount }) => {
  const component = await mount(<Chip value="Chip" />);
  await expect(component).toBeAttached();
});

test('should be type choice', async ({ mount, page }) => {
  await mount(<Chip value="Chip" type="choice" isSelected />);
  await expect(page).toHaveScreenshot();
});

test.describe('chip colors', () => {
  test('should be green', async ({ mount, page }) => {
    await mount(<Chip color="green" value="Chip" type="legend" isSelected />);
    await expect(page).toHaveScreenshot();
  });
  test('should be blue', async ({ mount, page }) => {
    await mount(<Chip color="blue" value="Chip" type="legend" isSelected />);
    await expect(page).toHaveScreenshot();
  });
  test('should be orange', async ({ mount, page }) => {
    await mount(<Chip color="orange" value="Chip" type="legend" isSelected />);
    await expect(page).toHaveScreenshot();
  });
  test('should be purple', async ({ mount, page }) => {
    await mount(<Chip color="purple" value="Chip" type="legend" isSelected />);
    await expect(page).toHaveScreenshot();
  });
  test('should be red', async ({ mount, page }) => {
    await mount(<Chip color="red" value="Chip" type="legend" isSelected />);
    await expect(page).toHaveScreenshot();
  });
  test('should be violet', async ({ mount, page }) => {
    await mount(<Chip color="violet" value="Chip" type="legend" isSelected />);
    await expect(page).toHaveScreenshot();
  });
});

test('should be type legend', async ({ mount, page }) => {
  await mount(<Chip value="Chip" type="legend" isSelected />);
  await expect(page).toHaveScreenshot();
});

test('should be type removable', async ({ mount, page }) => {
  await mount(<Chip value="Chip" type="removable" />);
  await expect(page).toHaveScreenshot();
});
