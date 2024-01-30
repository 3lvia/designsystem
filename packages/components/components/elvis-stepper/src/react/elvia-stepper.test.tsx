import Stepper from './elvia-stepper';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';

describe('Elvis Stepper', () => {
  const steps = {
    1: { isCompleted: true, heading: 'Title 1' },
    2: { heading: 'Title 2', nextButtonText: 'Videre' },
    3: { isError: true, heading: 'Title 3', previousButtonText: 'Forrige' },
    4: { isError: true, heading: 'Title 4' },
    5: { heading: 'Title 5' },
  };

  const content = [
    <div key={1}>Step 1 content</div>,
    <div key={2}>Step 2 content</div>,
    <div key={3}>Step 3 content</div>,
    <div key={4}>Step 4 content</div>,
    <div key={5}>Step 5 content</div>,
  ];

  describe('Default (horizontal)', () => {
    beforeEach(() => {
      render(<Stepper type="horizontal" steps={steps} content={content} />);
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
      const nextButton = screen.getByRole('button', { name: /neste/i });
      await user.click(nextButton);

      const backButton = screen.getByRole('button', { name: /tilbake/i });

      await user.click(backButton);
      const content = screen.getByRole('tabpanel');
      expect(content).toHaveTextContent('Step 1 content');
    });

    it('should jump to the last step when number is clicked in the header', async () => {
      const user = userEvent.setup();
      const lastPage = screen.getByRole('button', { name: /5/i });
      await user.click(lastPage);
      const content = screen.getByRole('tabpanel');
      expect(content).toHaveTextContent('Step 5 content');
    });

    it('should jump back to the first step when number is clicked in the header', async () => {
      const user = userEvent.setup();
      const lastPage = screen.getByRole('button', { name: /1/i });
      await user.click(lastPage);
      const content = screen.getByRole('tabpanel');
      expect(content).toHaveTextContent('Step 1 content');
    });

    it('should have error state when isError is applied', async () => {
      const screenReader = screen.queryByText('På steg 1. Steg 3 og 4 var ugyldig.');
      expect(screenReader).toBeInTheDocument();
    });

    it('should register that the previous step was complete', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /neste/i });
      await user.click(nextButton);
      const screenReader = screen.queryByText(
        'På steg 2. Det forrige steget var vellykket. Steg 3 og 4 var ugyldig.',
      );
      expect(screenReader).toBeInTheDocument();
    });

    it('should have the right next and previous button text', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /neste/i });
      await user.click(nextButton);
      const newNextButton = screen.getByRole('button', { name: /videre/i });
      expect(newNextButton).toBeDefined();
      await user.click(newNextButton);
      const previousButton = screen.getByRole('button', { name: /forrige/i });
      expect(previousButton).toBeDefined();
    });
  });

  describe('Default (vertical)', () => {
    beforeEach(() => {
      render(<Stepper type="vertical" steps={steps} content={content} />);
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
      const nextButton = screen.getByRole('button', { name: /neste/i });
      await user.click(nextButton);

      const backButton = screen.getByRole('button', { name: /tilbake/i });

      await user.click(backButton);
      const content = screen.getByRole('tabpanel');
      expect(content).toHaveTextContent('Step 1 content');
    });

    it('should jump to the last step when number is clicked in the header', async () => {
      const user = userEvent.setup();
      const lastPage = screen.getByRole('button', { name: /5/i });
      await user.click(lastPage);
      const content = screen.getByRole('tabpanel');
      expect(content).toHaveTextContent('Step 5 content');
    });

    it('should jump back to the first step when number is clicked in the header', async () => {
      const user = userEvent.setup();
      const lastPage = screen.getByRole('button', { name: /1/i });
      await user.click(lastPage);
      const content = screen.getByRole('tabpanel');
      expect(content).toHaveTextContent('Step 1 content');
    });

    it('should have error state when isError is applied', async () => {
      const screenReader = screen.queryByText('På steg 1. Steg 3 og 4 var ugyldig.');
      expect(screenReader).toBeInTheDocument();
    });

    it('should register that the previous step was complete', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /neste/i });
      await user.click(nextButton);
      const screenReader = screen.queryByText(
        'På steg 2. Det forrige steget var vellykket. Steg 3 og 4 var ugyldig.',
      );
      expect(screenReader).toBeInTheDocument();
    });

    it('should have the right next and previous button text', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /neste/i });
      await user.click(nextButton);
      const newNextButton = screen.getByRole('button', { name: /videre/i });
      expect(newNextButton).toBeDefined();
      await user.click(newNextButton);
      const previousButton = screen.getByRole('button', { name: /forrige/i });
      expect(previousButton).toBeDefined();
    });
  });

  describe('Events', () => {
    const onFinishEvent = jest.fn();
    const valueOnChangeEvent = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      render(
        <Stepper
          content={content}
          onFinish={onFinishEvent}
          steps={steps}
          valueOnChange={valueOnChangeEvent}
        />,
      );
    });

    it('should not emit events when idle', async () => {
      await waitFor(() => expect(onFinishEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(valueOnChangeEvent).not.toHaveBeenCalled());
    });

    it('valueOnChangeEvent: should emit the value change event when the user goes to the next or previous page, or clicks on a number', async () => {
      const user = userEvent.setup();

      const nextButton = screen.getByRole('button', { name: /neste/i });
      await user.click(nextButton);

      const backButton = screen.getByRole('button', { name: /tilbake/i });
      await user.click(backButton);

      const page = screen.getByRole('button', { name: /5/i });
      await user.click(page);

      expect(valueOnChangeEvent).toHaveBeenCalledTimes(3);
    });

    it('onFinishEvent: should emit the finish event when the user clicks the final "next" button', async () => {
      const user = userEvent.setup();
      const lastPage = screen.getByRole('button', { name: /5/i });
      const nextButton = screen.getByRole('button', { name: /neste/i });

      await user.click(lastPage);
      await user.click(nextButton);

      expect(onFinishEvent).toHaveBeenCalledTimes(1);
    });
  });
});
