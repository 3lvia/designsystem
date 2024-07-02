import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Card } from '../../react';

test('should render', async ({ mount }) => {
  const component = await mount(<Card />);
  await expect(component).toBeAttached();
});

test('cards', async ({ mount, page }) => {
  await mount(
    <div className="e-flex e-gap-40 e-flex-direction-column">
      <Card heading="Forbruk" description="Kort description" icon="Icon" />
      <Card type="simple" borderColor="green" heading="Forbruk" description="Kort description" icon="Icon" />
      <Card type="simple" borderColor="orange" heading="Forbruk" description="Kort description" icon="Icon" />
      <Card type="simple" borderColor="red" heading="Forbruk" description="Kort description" icon="Icon" />
      <Card
        type="detail"
        heading="Varsler ved lynnedslag"
        description="Data om prognoser ved lyn og hvordan dette påvirker strømnettet."
        tag="Sikkerhet"
      />
      <Card
        type="detail"
        heading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi perferendis, voluptate culpa quas earum fuga obcaecati voluptas officia cum."
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam sequi assumenda itaque dignissimos porro, minima minus saepe earum totam! Blanditiis quisquam eligendi laborum nobis ullam reprehenderit quos id. Necessitatibus voluptatem quaerat, nihil aliquid sit quos fuga deleniti qui numquam ducimus laudantium voluptatibus molestiae architecto et soluta porro earum possimus natus cupiditate quas cumque illo alias eius. In pariatur laborum tenetur possimus corporis, dolorum incidunt qui ipsum quos harum. Nihil itaque aperiam perferendis praesentium, harum accusantium voluptate rem, non sequi earum officia quae molestias accusamus! Consectetur nostrum facere odit reiciendis pariatur, cumque illo ducimus accusamus commodi! Eos ea error beatae magni."
        tag="Sikkerhet"
      />
    </div>,
  );
  await percySnapshot(page, 'Cards');
});
