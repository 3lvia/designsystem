import Stepper from './elvia-stepper';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

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
            4: { isError: true, title: 'Title 4' },
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
      const title = screen.getByLabelText('title');
      expect(title).toHaveTextContent('Title 2');
    });

    it('should jump back to previous step when back button is clicked', async () => {
      const user = userEvent.setup();
      const backButton = screen.getByRole('button', { name: /tilbake/i });

      await user.click(backButton);
      const title = screen.getByLabelText('title');
      expect(title).toHaveTextContent('Title 1');
    });

    it('should jump to the last step when number is clicked in the header', async () => {
      const user = userEvent.setup();
      const lastPage = screen.getByRole('tab', { name: /5/i });
      await user.click(lastPage);
      const title = screen.getByLabelText('title');
      expect(title).toHaveTextContent('Title 5');
    });

    it('should jump back to the first step when number is clicked in the header', async () => {
      const user = userEvent.setup();
      const lastPage = screen.getByRole('tab', { name: /1/i });
      await user.click(lastPage);
      const title = screen.getByLabelText('title');
      expect(title).toHaveTextContent('Title 1');
    });

    it('should have error state when isError is applied', async () => {
      const screenReader = screen.getByRole('status');
      expect(screenReader).toHaveTextContent('Step 3 and 4 was invalid.');
    });

    it('should register that the previous step was complete', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /neste/i });
      await user.click(nextButton);
      const screenReader = screen.getByRole('status');
      expect(screenReader).toHaveTextContent('The previous step was successful.');
    });
  });

  describe('Default', () => {
    beforeEach(() => {
      render(
        <Stepper
          type="vertical"
          steps={{
            1: { isCompleted: true, title: 'Title 1' },
            2: { title: 'Title 2' },
            3: { isError: true, title: 'Title 3' },
            4: { isError: true, title: 'Title 4' },
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
      const content = screen.getByRole('tabpanel');
      expect(content).toHaveTextContent('Step 2 content');
    });

    it('should jump back to previous step when back button is clicked', async () => {
      const user = userEvent.setup();
      const backButton = screen.getByRole('button', { name: /tilbake/i });

      await user.click(backButton);
      const content = screen.getByRole('tabpanel');
      expect(content).toHaveTextContent('Step 1 content');
    });

    it('should jump to the last step when number is clicked in the header', async () => {
      const user = userEvent.setup();
      const lastPage = screen.getByRole('tab', { name: /5/i });
      await user.click(lastPage);
      const content = screen.getByRole('tabpanel');
      expect(content).toHaveTextContent('Step 5 content');
    });

    it('should jump back to the first step when number is clicked in the header', async () => {
      const user = userEvent.setup();
      const lastPage = screen.getByRole('tab', { name: /1/i });
      await user.click(lastPage);
      const content = screen.getByRole('tabpanel');
      expect(content).toHaveTextContent('Step 1 content');
    });

    it('should have error state when isError is applied', async () => {
      const screenReader = screen.getByRole('status');
      expect(screenReader).toHaveTextContent('Step 3 and 4 was invalid.');
    });
  });
});
