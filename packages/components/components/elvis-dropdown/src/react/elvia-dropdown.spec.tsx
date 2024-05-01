import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Dropdown } from '../../react';

test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(
    <Dropdown
      value={'Norge'}
      label={'Land'}
      items={[
        { value: 'Norge', label: 'Norge' },
        { value: 'Sverige', label: 'Sverige' },
        { value: 'Danmark', label: 'Danmark' },
      ]}
    />,
  );
  await expect(component).toBeAttached();
});

test('should look closed', async ({ mount, page }) => {
  await mount(
    <Dropdown
      value={'Norge'}
      label={'Land'}
      items={[
        { value: 'Norge', label: 'Norge' },
        { value: 'Sverige', label: 'Sverige' },
        { value: 'Danmark', label: 'Danmark' },
      ]}
    />,
  );
  await percySnapshot(page, 'Closed Dropdown');
});

test('should look opened', async ({ mount, page }) => {
  const component = await mount(
    <Dropdown
      value={'Norge'}
      label={'Land'}
      items={[
        { value: 'Norge', label: 'Norge' },
        { value: 'Sverige', label: 'Sverige' },
        { value: 'Danmark', label: 'Danmark' },
      ]}
    />,
  );

  await component.getByRole('combobox').click();
  await percySnapshot(page, 'Open Dropdown');
});
