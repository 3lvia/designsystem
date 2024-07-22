import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Dropdown, type DropdownItem } from '../../react';

const items: DropdownItem[] = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
  { label: 'Option 5', value: 'option5' },
  { label: 'Option 6', value: 'option6' },
  { label: 'Option 7', value: 'option7' },
  { label: 'Option 8', value: 'option8' },
  { label: 'Option 9', value: 'option9' },
];

test.use({ viewport: { width: 800, height: 700 } });

test('should render', async ({ mount }) => {
  const component = await mount(<Dropdown items={items} />);
  await expect(component).toBeAttached();
});

test('should look closed', async ({ mount, page }) => {
  await mount(
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <Dropdown items={items} />
      <Dropdown items={items} isDisabled />
      <Dropdown items={items} errorOptions={{ isErrorState: true, text: 'Error text' }} />
      <Dropdown items={items} placeholder="Placeholder" isFullWidth value="option3" />
      <Dropdown items={items} size="small" />
      <Dropdown items={items} size="small" isDisabled />
      <Dropdown items={items} size="small" errorOptions={{ isErrorState: true, text: 'Error text' }} />
      <Dropdown items={items} size="small" placeholder="Placeholder" isFullWidth />
    </div>,
  );
  await percySnapshot(page, 'Dropdown: closed');
});

test('should look opened', async ({ mount, page }) => {
  const component = await mount(<Dropdown items={items} value="option3" />);
  await component.getByRole('combobox').click();
  await percySnapshot(page, 'Dropdown: open');
});
