import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { ContextMenu } from '../../react';

test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
  const component = await mount(
    <ContextMenu trigger={<button>I am the trigger</button>} content={<button>Item 1</button>} />,
  );
  await expect(component).toBeAttached();
});

test('should look as expected (default)', async ({ mount, page }) => {
  await page.waitForTimeout(1000);
  const component = await mount(
    <ContextMenu
      trigger={<button className="e-btn">Open menu</button>}
      content={
        <div>
          <div className="ewc-context-menu__list-group">
            <button>Be om tilgang</button>
            <button>Legg til bruker</button>
          </div>
          <div className="ewc-context-menu__list-group">
            <a>Endre passord</a>
            <button>Innstillinger</button>
          </div>
        </div>
      }
    />,
  );
  await page.waitForTimeout(1000);
  await component.getByRole('button').click();
  await page.waitForTimeout(1000);

  await percySnapshot(page, 'Context menu: open');
});

test('should have heading', async ({ mount, page }) => {
  const component = await mount(
    <ContextMenu
      trigger={<button className="e-btn">Open menu</button>}
      content={
        <div>
          <div className="ewc-context-menu__list-group">
            <h1>Kundeforhold</h1>
            <button>Be om tilgang</button>
          </div>
          <div className="ewc-context-menu__list-group">
            <h1>Innlogging</h1>
            <a>Endre passord</a>
          </div>
        </div>
      }
    />,
  );

  await component.getByRole('button').click();

  await percySnapshot(page, 'Context menu: heading');
});

test('should be selectable', async ({ mount, page }) => {
  const component = await mount(
    <ContextMenu
      isSelectable
      trigger={<button className="e-btn">Open menu</button>}
      content={
        <div className="ewc-context-menu__list-group">
          <button>
            <i className="e-icon e-icon--check-bold e-icon--xs"></i>
            Dato - nyeste til eldste
          </button>
          <button>Dato - eldste til nyeste</button>
          <button>Relevans</button>
        </div>
      }
    />,
  );

  await component.getByRole('button').click();

  await percySnapshot(page, 'Context menu: selectable');
});
