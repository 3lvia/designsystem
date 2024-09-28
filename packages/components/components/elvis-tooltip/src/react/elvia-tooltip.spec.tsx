import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Tooltip } from '../../react';

test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(
    <Tooltip
      content={'Brukerinnstillinger'}
      trigger={
        <button className="e-btn">
          <span className="e-btn__title">trigger</span>
        </button>
      }
    />,
  );
  await expect(component).toBeAttached();
});

test('should look as expected', async ({ mount, page }) => {
  const components = await mount(
    <div style={{ display: 'grid', placeItems: 'center', padding: '64px' }}>
      <Tooltip
        showDelay={0}
        content={'Content'}
        trigger={
          <button className="e-btn">
            <span className="e-btn__title">trigger</span>
          </button>
        }
      />
    </div>,
  );

  await components.getByRole('button').hover();
  await percySnapshot(page, 'Tooltip');
});
