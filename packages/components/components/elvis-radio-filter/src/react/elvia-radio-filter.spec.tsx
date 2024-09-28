import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { RadioFilter } from '../../react';

test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(
    <RadioFilter value="all" name="hello" items={[{ label: 'Alle', value: 'all' }]} />,
  );
  await expect(component).toBeAttached();
});

test('should look as expected', async ({ mount, page }) => {
  const components = await mount(
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
      <RadioFilter
        value="read"
        name="example"
        items={[
          { label: 'Alle', value: 'all' },
          { label: 'Lest', value: 'read' },
          { label: 'Ulest', value: 'unread' },
        ]}
      />
      <RadioFilter
        value="car"
        name="example"
        items={[
          { label: 'Bil', value: 'car' },
          { label: 'Båt', value: 'boat' },
          { label: 'Sykkel', value: 'bike' },
        ]}
      />
    </div>,
  );

  await components.getByRole('radio', { name: /sykkel/i }).hover();
  await percySnapshot(page, 'RadioFilter');
});
