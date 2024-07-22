import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Autocomplete, type AutocompleteItem } from '../../react';

test.use({ viewport: { width: 600, height: 1000 } });

const items: AutocompleteItem[] = [
  { value: '1', label: 'Item 1' },
  { value: '2', label: 'Item 2' },
  { value: '3', label: 'Item 3' },
];

test('should render', async ({ mount }) => {
  const component = await mount(<Autocomplete items={items} />);
  await expect(component).toBeAttached();
});

test('should look closed', async ({ mount, page }) => {
  await mount(
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <Autocomplete items={items} />
      <Autocomplete items={items} value="Item 1" />
      <Autocomplete items={items} isDisabled />
      <Autocomplete items={items} isDisabled value="Item 1" />
      <Autocomplete items={items} isFullWidth />
      <Autocomplete items={items} isFullWidth value="Item 1" />
      <Autocomplete
        items={items}
        errorOptions={{
          isErrorState: true,
          text: 'Error',
        }}
      />
      <Autocomplete items={items} size="small" />
      <Autocomplete items={items} size="small" value="Item 1" />
      <Autocomplete items={items} size="small" isDisabled />
      <Autocomplete items={items} size="small" isDisabled value="Item 1" />
      <Autocomplete
        items={items}
        size="small"
        errorOptions={{
          isErrorState: true,
          text: 'Error',
        }}
      />
    </div>,
  );
  await percySnapshot(page, 'Autocomplete: closed');
});

test('should look opened', async ({ mount, page }) => {
  const component = await mount(<Autocomplete items={items} />);
  const input = component.getByRole('combobox');
  await input.fill('I');
  await page.getByText('Item 3').hover();

  await percySnapshot(page, 'Autocomplete: open');
});
