import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Stepper } from '../../react';

const steps = {
  1: { heading: 'Tittel 1' },
  2: { heading: 'Tittel 2' },
  3: { heading: 'Tittel 3' },
  4: { heading: 'Tittel 4' },
  5: { heading: 'Tittel 5' },
  6: { heading: 'Tittel 6' },
};

const content = [
  <div key="step1">Trinn 1 innhold</div>,
  <div key="step2">Trinn 2 innhold</div>,
  <div key="step3">Trinn 3 innhold</div>,
  <div key="step4">Trinn 4 innhold</div>,
  <div key="step5">Trinn 5 innhold</div>,
  <div key="step6">Trinn 6 innhold</div>,
];

test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(<Stepper />);
  await expect(component).toBeAttached();
});

test('should look as expected (horizontal)', async ({ mount, page }) => {
  await mount(
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', margin: '64px' }}>
      <Stepper type="horizontal" steps={steps} content={content} />
    </div>,
  );
  await page.waitForTimeout(500);
  await percySnapshot(page, 'Stepper: horizontal');
});

test('should look as expected (vertical)', async ({ mount, page }) => {
  await mount(
    <div style={{ display: 'flex', gap: '16px', flexDirection: 'column', margin: '64px' }}>
      <Stepper type="vertical" steps={steps} content={content} />
    </div>,
  );
  await percySnapshot(page, 'Stepper: vertical');
});
