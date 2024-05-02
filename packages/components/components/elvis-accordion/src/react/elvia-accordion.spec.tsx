import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Accordion } from '../../react';

test('should render', async ({ mount }) => {
  const component = await mount(<Accordion openLabel="Open" closeLabel="Close" content={'test'} />);
  await expect(component).toBeAttached();
});

test('accordions', async ({ mount, page }) => {
  await mount(
    <div className="e-flex e-gap-40 e-flex-direction-column">
      <Accordion
        openLabel="Closed accordion"
        closeLabel="Closed accordion"
        content={
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsam, deleniti enim
            consequatur officiis animi nostrum facilis tenetur temporibus alias aliquam eum praesentium nisi?
            Repudiandae dolor perspiciatis est sapiente porro. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatibus ipsam, deleniti enim consequatur officiis animi nostrum facilis
            tenetur temporibus alias aliquam eum praesentium nisi? Repudiandae dolor perspiciatis est sapiente
            porro.
          </div>
        }
      />
      <Accordion
        openLabel="Open accordion"
        closeLabel="Open accordion"
        content={
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsam, deleniti enim
            consequatur officiis animi nostrum facilis tenetur temporibus alias aliquam eum praesentium nisi?
            Repudiandae dolor perspiciatis est sapiente porro. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatibus ipsam, deleniti enim consequatur officiis animi nostrum facilis
            tenetur temporibus alias aliquam eum praesentium nisi? Repudiandae dolor perspiciatis est sapiente
            porro.
          </div>
        }
      />
      <Accordion
        openLabel="Overflow accordion"
        closeLabel="Overflow accordion"
        type="overflow"
        content={
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsam, deleniti enim
            consequatur officiis animi nostrum facilis tenetur temporibus alias aliquam eum praesentium nisi?
            Repudiandae dolor perspiciatis est sapiente porro. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatibus ipsam, deleniti enim consequatur officiis animi nostrum facilis
            tenetur temporibus alias aliquam eum praesentium nisi? Repudiandae dolor perspiciatis est sapiente
            porro.
          </div>
        }
      />
      <Accordion
        openLabel="Click to open accordion"
        closeLabel="Click to open accordion"
        content={
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsam, deleniti enim
            consequatur officiis animi nostrum facilis tenetur temporibus alias aliquam eum praesentium nisi?
            Repudiandae dolor perspiciatis est sapiente porro. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatibus ipsam, deleniti enim consequatur officiis animi nostrum facilis
            tenetur temporibus alias aliquam eum praesentium nisi? Repudiandae dolor perspiciatis est sapiente
            porro.
          </div>
        }
      />
    </div>,
  );
  await page.getByRole('button', { name: 'Click to open accordion', exact: true }).click();
  await page.waitForTimeout(300);
  await percySnapshot(page, 'Accordions');
});
