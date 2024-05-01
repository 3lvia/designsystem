import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Dropdown } from '../../react';

test.use({ viewport: { width: 1080, height: 300 } });

const items = [
  { value: 'Norge', label: 'Norge' },
  { value: 'Sverige', label: 'Sverige' },
  { value: 'Danmark', label: 'Danmark' },
];

const nestedItems = [
  {
    value: 'norge',
    label: 'Norge',
    children: [
      {
        label: 'Bergen',
        value: 'bergen',
        children: [
          { label: 'Arna', value: 'arna' },
          { label: 'Bergenhus', value: 'bergenhus' },
        ],
      },
      { label: 'Trondheim', value: 'trondheim' },
    ],
  },
  { value: 'spania', label: 'Spania' },
  { value: 'tyskland', label: 'Tyskland' },
];

test('should render', async ({ mount }) => {
  const component = await mount(<Dropdown value={'Norge'} label={'Land'} items={items} />);
  await expect(component).toBeAttached();
});

test('should look closed', async ({ mount, page }) => {
  await mount(<Dropdown value={'Norge'} label={'Land'} items={items} />);
  await percySnapshot(page, 'Closed Dropdown');
});

test('should look opened', async ({ mount, page }) => {
  const component = await mount(<Dropdown value={'Norge'} label={'Land'} items={items} />);

  await component.getByRole('combobox').click();
  await percySnapshot(page, 'Open Dropdown');
});

test('should look opened with nested items', async ({ mount, page }) => {
  await mount(<Dropdown label={'Sted'} items={nestedItems} />);

  await page.getByRole('combobox').click();

  await page.getByRole('option', { name: /norge/i }).hover();
  await page.getByRole('option', { name: /bergen/i }).hover();
  await page.waitForTimeout(300);

  await percySnapshot(page, 'Open Dropdown with nested items');
});
