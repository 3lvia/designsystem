import percySnapshot from '@percy/playwright';
import { expect, test } from '@playwright/experimental-ct-react';
import React from 'react';

import { Modal } from '../../react';

test('modal screenshots', async ({ mount, page }) => {
  await mount(
    <div className="e-flex e-gap-40 e-flex-direction-column">
      <Modal
        isShowing
        content={
          <div className="e-form-field">
            <label className="e-form-field__label e-form-field__label--optional" htmlFor="textarea">
              Label
            </label>
            <div className="e-input">
              <textarea id="textarea" placeholder="Plassholdertekst">
                This text should not be blurry. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Sequi, necessitatibus, error non libero laboriosam quasi incidunt distinctio natus, aliquam
                officia voluptatibus repellendus? Eius rerum perferendis nemo vitae id ad minus non quam
                aliquid cum suscipit officia, eligendi delectus ratione? Laboriosam excepturi, commodi
                voluptatum itaque et qui nam omnis magni quas eaque aperiam amet, aliquid, non illo ut sed
                dolorem? Iure pariatur facere debitis vel ea delectus fugit rerum minima hic necessitatibus!
                Voluptatibus voluptas ad excepturi, minima quod similique corporis assumenda delectus,
                tenetur, velit sit magnam nihil a id. Esse, tenetur delectus est eos facilis quam aliquam vero
                sequi dolorem voluptatum.
              </textarea>
            </div>
          </div>
        }
      ></Modal>
    </div>,
  );

  await percySnapshot(page, 'Modals');
});

test('should be able to close by clicking the backdrop', async ({ mount, page }) => {
  await mount(
    <Modal heading={<span>I am heading</span>} content={<p>Content</p>} hasCloseButton isShowing />,
  );

  await expect(page.getByRole('dialog')).toBeVisible();

  const backdrop = page.getByTestId('modal-backdrop');
  await backdrop.click({ position: { x: 100, y: 100 } });

  await expect(page.getByRole('dialog')).not.toBeVisible();
});
