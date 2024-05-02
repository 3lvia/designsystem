import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Dropdown } from '../../react';

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

test('should look as expected', async ({ mount, page }) => {
  await mount(
    <div className="e-flex e-gap-8 e-flex-direction-column">
      <Dropdown value={'Norge'} size={'small'} label={'Small'} items={items} />
      <Dropdown value={'Norge'} size={'medium'} label={'Medium'} items={items} />
      <Dropdown value={'Norge'} isDisabled={true} label={'Disabled'} items={items} />
      <Dropdown value={'Norge'} isFullWidth label={'Full Width'} items={items} />
      <Dropdown
        value={'Norge'}
        label={'Error State'}
        items={items}
        errorOptions={{
          hasErrorPlaceholder: false,
          isErrorState: true,
        }}
      />
      <Dropdown
        value={'Norge'}
        label={'Error Message'}
        items={items}
        errorOptions={{
          text: 'Error message',
          isErrorState: true,
        }}
      />
      <Dropdown value={'Norge'} label={'Land'} items={items} />
    </div>,
  );

  const dropdowns = await page.getByRole('combobox').all();

  await dropdowns[dropdowns.length - 1].click();
  await percySnapshot(page, 'Dropdowns', { widths: [1200] });
});

test('should look as expected 2', async ({ mount, page }) => {
  await mount(
    <div className="e-flex e-gap-8 e-flex-direction-column">
      <Dropdown value={'Norge'} size={'small'} label={'Small'} items={items} />
      <Dropdown value={'Norge'} size={'medium'} label={'Medium'} items={items} />
      <Dropdown value={'Norge'} isDisabled={true} label={'Disabled'} items={items} />
      <Dropdown value={'Norge'} isFullWidth label={'Full Width'} items={items} />
      <Dropdown
        value={'Norge'}
        label={'Error State'}
        items={items}
        errorOptions={{
          hasErrorPlaceholder: false,
          isErrorState: true,
        }}
      />
      <Dropdown
        value={'Norge'}
        label={'Error Message'}
        items={items}
        errorOptions={{
          text: 'Error message',
          isErrorState: true,
        }}
      />
      <Dropdown value={'Norge'} label={'Land'} items={items} />
    </div>,
  );

  const dropdowns = await page.getByRole('combobox').all();

  await dropdowns[dropdowns.length - 1].click();
  await percySnapshot(page, 'Dropdowns 2', { widths: [600] });
});

test('should look opened with nested items', async ({ mount, page }) => {
  await mount(<Dropdown label={'Sted'} items={nestedItems} />);

  await page.getByRole('combobox').click();

  await page.getByRole('option', { name: /norge/i }).click();
  await page.getByRole('option', { name: /bergen/i }).click();
  await page.waitForTimeout(300);

  await percySnapshot(page, 'Open Dropdown with nested items', { widths: [600, 1200] });
});
