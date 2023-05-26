import Stepper from './elvia-stepper';
import React from 'react';
// import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { getThemeColor } from '@elvia/elvis-colors';

describe('Elvis Stepper', () => {
  describe('Default', () => {
    beforeEach(() => {
      render(
        <Stepper
          type="horizontal"
          steps={{
            1: { isCompleted: true, title: 'Title 1' },
            2: { title: 'Title 2' },
            3: { isError: true, title: 'Title 3' },
            4: { title: 'Title 4' },
            5: { title: 'Title 5' },
          }}
          content={[
            <div key={1}>Step 1 content</div>,
            <div key={2}>Step 2 content</div>,
            <div key={3}>Step 3 content</div>,
            <div key={4}>Step 4 content</div>,
            <div key={5}>Step 5 content</div>,
          ]}
        />,
      );
    });

    it('should jump to next step when next button is clicked', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /neste/i });
      await user.click(nextButton);
      const title = screen.queryByLabelText('title');
      expect(title).toHaveTextContent('Title 2');
    });

    it('should jump back to previous step when back button is clicked', async () => {
      const user = userEvent.setup();
      const backButton = screen.getByRole('button', { name: /tilbake/i });

      await user.click(backButton);
      const title = screen.queryByLabelText('title');
      expect(title).toHaveTextContent('Title 1');
    });

    it('should jump to the last step when number is clicked in the header', async () => {
      const user = userEvent.setup();
      const lastPage = screen.getByRole('tab', { name: /5/i });
      await user.click(lastPage);
      const title = screen.queryByLabelText('title');
      expect(title).toHaveTextContent('Title 5');
    });

    it('should jump back to the first step when number is clicked in the header', async () => {
      const user = userEvent.setup();
      const lastPage = screen.getByRole('tab', { name: /1/i });
      await user.click(lastPage);
      const title = screen.queryByLabelText('title');
      expect(title).toHaveTextContent('Title 1');
    });

    // it('should have different background color when isCompleted is applied', async () => {
    //   const completedStep = screen.getByRole('tab', { name: /1/i });

    //   expect(completedStep).toHaveStyle(`background-color: ${getThemeColor('icon-filled-background')}`);
    // });

    // it('should have red border when isError is applied', async () => {
    //   const errorStep = screen.getByRole('tab', { name: /3/i });

    //   expect(errorStep).toHaveStyle(`border: 2px solid ${getThemeColor('signal-error')}`);
    // });
  });
});
