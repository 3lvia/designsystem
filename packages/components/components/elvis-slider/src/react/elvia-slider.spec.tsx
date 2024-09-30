import { FormFieldSizes } from '@elvia/elvis-toolbox';
import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Slider, SliderType } from '../../react';

test.use({ viewport: { width: 500, height: 1000 } });

const renderSliders = (type: SliderType, size: FormFieldSizes) => (
  <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
    <Slider type={type} size={size} />
    <Slider type={type} size={size} label={'Label'} />
    <Slider type={type} size={size} label={'Label'} hasHints={false} />
    <Slider type={type} size={size} label={'Label'} hasInputField={false} />
    <Slider type={type} size={size} label={'Label'} isDisabled />
    {type === 'range' && (
      <>
        <Slider
          type={type}
          size={size}
          label={'Label'}
          value={{
            left: 20,
            right: 80,
          }}
        />
        <Slider
          type={type}
          size={size}
          label={'Label'}
          errorOptions={{
            left: {
              text: 'Left error text',
              hideText: false,
              isErrorState: true,
              hasErrorPlaceholder: true,
            },
            right: {
              text: 'Right error text',
              hideText: false,
              isErrorState: true,
              hasErrorPlaceholder: true,
            },
          }}
        />
      </>
    )}
    {type !== 'range' && (
      <>
        <Slider type={type} size={size} label={'Label'} value={50} />
        <Slider
          type={type}
          size={size}
          label={'Label'}
          errorOptions={{
            text: 'Error message',
            hideText: false,
            isErrorState: true,
            hasErrorPlaceholder: true,
          }}
        />
      </>
    )}
  </div>
);

test('should render', async ({ mount }) => {
  const component = await mount(<Slider />);
  await expect(component).toBeAttached();
});

test('should look as expected (simple, medium)', async ({ mount, page }) => {
  await mount(renderSliders('simple', 'medium'));
  setTimeout(async () => {
    await percySnapshot(page, 'Slider: simple (medium)');
  }, 250); //timeout to wait for component to finish rendering
});

test('should look as expected (simple, small)', async ({ mount, page }) => {
  await mount(renderSliders('simple', 'small'));
  setTimeout(async () => {
    await percySnapshot(page, 'Slider: simple (small)');
  }, 250);
});

test('should look as expected (range, medium)', async ({ mount, page }) => {
  await mount(renderSliders('range', 'medium'));
  setTimeout(async () => {
    await percySnapshot(page, 'Slider: range (medium)');
  }, 250);
});

test('should look as expected (range, small)', async ({ mount, page }) => {
  await mount(renderSliders('range', 'small'));
  setTimeout(async () => {
    await percySnapshot(page, 'Slider: range (small)');
  }, 250);
});
