import Chip from './elvia-chip';
import React from 'react';
import { axe } from 'jest-axe';
import { getBaseColor, getThemeColor } from '@elvia/elvis-colors';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setOpacity } from './styledComponents';

const colors = {
  green: getBaseColor('green-apple', 'light'),
  blue: getBaseColor('blue-berry', 'light'),
};

describe('Elvis Chip', () => {
  describe('Default', () => {
    beforeEach(() => {
      render(<Chip value="chip value"></Chip>);
    });

    it('should have label "chip value"', () => {
      const chipLabel = screen.getByTestId('chip-label');
      expect(chipLabel).toHaveTextContent('chip value');
    });
  });

  describe('Type = Removable', () => {
    beforeEach(() => {
      render(<Chip type="removable" value="chip value" image={<div>chip image</div>} />);
    });

    it('should render image', () => {
      const chipImage = screen.getByText('chip image');
      expect(chipImage).toBeInTheDocument();
    });
  });

  describe('Type = Legend', () => {
    beforeEach(() => {
      render(<Chip type="legend" value="chip value"></Chip>);
    });

    it('should not be selected', () => {
      const chipButton = screen.getByTestId('chip-button');
      expect(chipButton).toHaveStyle('background-color: transparent;');
    });
  });

  describe('Type = Legend, Selected by default', () => {
    beforeEach(() => {
      render(<Chip type="legend" value="chip value" isSelected></Chip>);
    });

    it('should be selected', () => {
      const chipButton = screen.getByTestId('chip-button');
      expect(chipButton).toHaveStyle(`background-color: ${setOpacity(colors.green, 30)};`);
    });
  });

  describe('Type = Choice', () => {
    beforeEach(() => {
      render(<Chip type="choice" value="chip value"></Chip>);
    });

    it('should not be selected', () => {
      const chipButton = screen.getByTestId('chip-button');
      expect(chipButton).toHaveStyle('background-color: transparent;');
    });
  });

  describe('Type = Choice, Selected by default', () => {
    beforeEach(() => {
      render(<Chip type="choice" value="chip value" isSelected></Chip>);
    });

    it('should be selected', () => {
      const chipButton = screen.getByTestId('chip-button');
      expect(chipButton).toHaveStyle(`background-color: ${setOpacity(colors.green, 30)};`);
    });
  });

  describe('Color = blue', () => {
    beforeEach(() => {
      render(<Chip value="chip value" color="blue" isSelected></Chip>);
    });

    it('should have color blue', () => {
      const chipButton = screen.getByTestId('chip-button');
      expect(chipButton).toHaveStyle(`background-color: ${setOpacity(colors.blue, 30)};`);
    });
  });

  describe('Disabled', () => {
    beforeEach(() => {
      render(<Chip value="chip value" isDisabled></Chip>);
    });

    it('should have text disabled', () => {
      const chipLabel = screen.getByTestId('chip-label');
      expect(chipLabel).toHaveStyle(`color: ${getThemeColor('text-disabled-1')}`);
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(<Chip value="chip value" className="test-class" inlineStyle={{ margin: '24px' }}></Chip>);
    });

    it('should have className and inlineStyle', () => {
      const chipButton = screen.getByTestId('chip-button');
      expect(chipButton).toHaveStyle('margin: 24px');
      expect(chipButton).toHaveClass('test-class');
    });
  });

  describe('Events', () => {
    const onDeleteEvent = jest.fn();
    const isSelectedOnChangeEvent = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      render(
        <>
          <Chip type={'removable'} value={'removable'} onDelete={onDeleteEvent} />
          <Chip
            type={'choice'}
            value={'choice'}
            isSelected={false}
            isSelectedOnChange={isSelectedOnChangeEvent}
          />
        </>,
      );
    });

    it('should not emit events when idle', async () => {
      await waitFor(() => expect(onDeleteEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(isSelectedOnChangeEvent).not.toHaveBeenCalled());
    });

    it('onDeleteEvent: should be called when clicking on delete icon', async () => {
      const user = userEvent.setup();
      const chipToRemove = screen.getByRole('button', { name: /removable/i });
      await user.click(chipToRemove);
      await waitFor(() => expect(onDeleteEvent).toHaveBeenCalledTimes(1));
    });

    it('isSelectedOnChangeEvent: should be called when clicking on chip', async () => {
      const user = userEvent.setup();
      const chip = screen.getByRole('checkbox', { name: /choice/i });
      await user.click(chip);
      await waitFor(() => expect(isSelectedOnChangeEvent).toHaveBeenCalledTimes(1));
    });
  });

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="chips">
          <Chip value="chip value" />
          <Chip type="legend" value="chip value" />
          <Chip type="legend" value="chip value" isSelected />
          <Chip type="choice" value="chip value" isSelected />
          <Chip value="chip value" isDisabled />
        </div>,
      );

      const chips = screen.getByTestId('chips');
      const results = await axe(chips);

      expect(results).toHaveNoViolations();
    });
  });
});
