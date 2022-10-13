import Chip from './elvia-chip';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { getColor } from '@elvia/elvis-colors';

const colors = {
  green: getColor('green-apple'),
  blue: getColor('blue-berry'),
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
      expect(chipButton).toHaveStyle(`background-color: ${colors.green}40;`);
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
      expect(chipButton).toHaveStyle(`background-color: ${colors.green}40;`);
    });
  });

  describe('Color = blue', () => {
    beforeEach(() => {
      render(<Chip value="chip value" color="blue" isSelected></Chip>);
    });

    it('should have color blue', () => {
      const chipButton = screen.getByTestId('chip-button');
      expect(chipButton).toHaveStyle(`background-color: ${colors.blue}40;`);
    });
  });

  describe('Disabled', () => {
    beforeEach(() => {
      render(<Chip value="chip value" isDisabled></Chip>);
    });

    it('should have text with opacity 0.3', () => {
      const chipLabel = screen.getByTestId('chip-label');
      expect(chipLabel).toHaveStyle(`opacity: 0.3;`);
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
});
