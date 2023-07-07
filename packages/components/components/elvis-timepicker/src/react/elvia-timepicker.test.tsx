import React from 'react';
import Timepicker from './elvia-timepicker';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';

export const padDigit = (d: number): string => {
  const paddedNumber = `0${d}`;
  return paddedNumber.substring(paddedNumber.length - 2);
};

describe('Elvis Timepicker', () => {
  describe('Basic', () => {
    let onOpenListener: jest.Mock;
    let onCloseListener: jest.Mock;

    beforeEach(() => {
      onOpenListener = jest.fn();
      onCloseListener = jest.fn();
      render(
        <Timepicker selectNowOnOpen={false} onOpen={onOpenListener} onClose={onCloseListener}></Timepicker>,
      );
    });

    it('should have a default label', () => {
      const label = screen.getByTestId('label');
      expect(label).toHaveTextContent('Velg tid');
    });

    it('should not have a default value', () => {
      const input = screen.getByTestId('input');
      expect(input).toHaveValue('');
    });

    it('should have a placeholder', () => {
      const input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.placeholder).toBe('tt:mm');
    });

    it('should have a toggle button', () => {
      const popoverToggle = screen.queryByTestId('popover-toggle');
      expect(popoverToggle).toBeInTheDocument();
    });

    it('should not have a popover visible by default', () => {
      const popover = screen.queryByTestId('popover');
      expect(popover).not.toBeInTheDocument();
    });

    describe('When the popover trigger is clicked', () => {
      beforeEach(async () => {
        const user = userEvent.setup();
        const popoverToggle = screen.getByTestId('popover-toggle');

        await user.click(popoverToggle);
      });

      it('the popover opens', () => {
        const popover = screen.queryByTestId('popover');
        expect(popover).toBeInTheDocument();
      });

      it('the popover contains an hours list', () => {
        const hoursList = screen.queryByTestId('Time-number-list');
        expect(hoursList).toBeInTheDocument();
      });

      it('the popover contains an minutes list', () => {
        const minutesList = screen.queryByTestId('Minutt-number-list');
        expect(minutesList).toBeInTheDocument();
      });

      it('the popover contains 28 hour buttons', () => {
        // 24 + 2 duplicates on each side for looping
        const hourButtons = screen.getAllByTestId('Time-number-button');
        expect(hourButtons.length).toBe(28);
      });

      it('the popover contains 8 minute buttons', () => {
        // 4 + 2 duplicates on each side for looping
        const minuteButtons = screen.getAllByTestId('Minutt-number-button');
        expect(minuteButtons.length).toBe(8);
      });

      it('an open event is emitted', () => {
        expect(onOpenListener).toHaveBeenCalled();
      });

      describe('and the backdrop is clicked', () => {
        beforeEach(async () => {
          const user = userEvent.setup();
          await user.click(screen.getByTestId('backdrop'));
        });

        it('the time picker closes', async () => {
          await waitFor(() => expect(screen.queryByTestId('popover')).not.toBeInTheDocument());
        });

        it('an close event is emitted', async () => {
          await waitFor(() => expect(onCloseListener).toHaveBeenCalled());
        });
      });

      describe('and the next-hour button is clicked', () => {
        beforeEach(async () => {
          const user = userEvent.setup();
          const nextHourButton = screen.getByTestId('Time-next-value-button');

          await user.click(nextHourButton);
        });

        it('the value in the input goes to the default setting', () => {
          const input = screen.getByTestId('input');
          expect(input).toHaveValue('00:00');
        });

        describe('and clicked again', () => {
          beforeEach(async () => {
            const user = userEvent.setup();
            const nextHourButton = screen.getByTestId('Time-next-value-button');

            await user.click(nextHourButton);
          });

          it('the hour increases by one', () => {
            const input = screen.getByTestId('input');
            expect(input).toHaveValue('01:00');
          });
        });

        describe('and the minute button is clicked', () => {
          beforeEach(async () => {
            const user = userEvent.setup();
            const nextMinuteButton = screen.getByTestId('Minutt-next-value-button');

            await user.click(nextMinuteButton);
          });

          it('the minute increases by 15', () => {
            const input = screen.getByTestId('input');
            expect(input).toHaveValue('00:15');
          });
        });
      });

      describe('and the hour button 01 is clicked', () => {
        beforeEach(async () => {
          const user = userEvent.setup();
          const hourButtons = screen.getAllByTestId('Time-number-button');

          await user.click(hourButtons[3]);
        });

        it('the hour is set to 01:00', () => {
          const input = screen.getByTestId('input');
          expect(input).toHaveValue('01:00');
        });
      });
    });

    describe('When the input is changed to 24 and blurred', () => {
      beforeEach(async () => {
        const user = userEvent.setup();
        const input = screen.getByTestId('input');

        await user.type(input, '24');
        await user.tab();
      });

      it('the value wraps to 00:00', () => {
        const input = screen.getByTestId('input');
        expect(input).toHaveValue('00:00');
      });
    });
  });

  describe('Disabled', () => {
    beforeEach(() => {
      render(<Timepicker isDisabled={true}></Timepicker>);
    });

    it('should have an disabled input field', () => {
      const input = screen.getByTestId('input');
      expect(input).toBeDisabled();
    });

    it('should have an disabled button', () => {
      const popoverToggle = screen.getByTestId('popover-toggle');
      expect(popoverToggle).toBeDisabled();
    });

    describe('When the popover trigger is clicked', () => {
      beforeEach(async () => {
        const user = userEvent.setup();

        const popoverToggle = screen.getByTestId('popover-toggle');

        await user.click(popoverToggle);
      });

      it('the popover does not open', () => {
        const popover = screen.queryByTestId('popover');
        expect(popover).not.toBeInTheDocument();
      });
    });
  });

  describe('With default select on open', () => {
    beforeEach(() => {
      render(<Timepicker selectNowOnOpen={true}></Timepicker>);
    });

    describe('When the popover trigger is clicked', () => {
      beforeEach(async () => {
        const user = userEvent.setup();
        const popoverToggle = screen.getByTestId('popover-toggle');

        await user.click(popoverToggle);
      });

      it('the input receives a default value', () => {
        const now = new Date();
        const input = screen.getByTestId('input');
        expect(input).toHaveValue(`${padDigit(now.getHours())}:${padDigit(now.getMinutes())}`);
      });
    });
  });

  describe('the accessibility', () => {
    const onOpenListener: jest.Mock = jest.fn();
    const onCloseListener: jest.Mock = jest.fn();

    it('should have no axe violations', async () => {
      render(
        <div data-testid="timepickers">
          <Timepicker isDisabled={true} />
          <Timepicker selectNowOnOpen={false} onOpen={onOpenListener} onClose={onCloseListener} />
        </div>,
      );

      const user = userEvent.setup();
      const popoverToggle = screen.getAllByTestId('popover-toggle');

      await user.click(popoverToggle[1]);

      const timepickers = screen.getByTestId('timepickers');
      const results = await axe(timepickers);

      expect(results).toHaveNoViolations();
    });
  });
});
