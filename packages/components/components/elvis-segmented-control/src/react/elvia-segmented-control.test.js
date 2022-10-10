import '@testing-library/jest-dom';
import React from 'react';
import SegmentedControl from './elvia-segmented-control';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

//========================
// Text Segmented Control
//========================
describe('Elvia Slider', () => {
  describe('The default text segmented control', () => {
    const type = 'text';

    //==================== RENDERING ====================
    test('should contain a single input type=range', () => {
      render(<SegmentedControl type={type} items={[{}]} />);
      const leftSliderInput = screen.getByTestId('left-slider');

      expect(leftSliderInput).toBeInTheDocument();
      expect(leftSliderInput).toHaveAttribute('type', 'range');
      expect(screen.getAllByRole('slider')).toHaveLength(1);
    });

    //========== MIMICKING USER INTERACTIONS ==========

    test('should display the tooptip containing the value on hover', async () => {
      const user = userEvent.setup();
      render(<SegmentedControl type={type} min={min} max={max} />);
      const leftSliderInput = screen.getByTestId('left-slider');

      expect(leftSliderInput).toBeEnabled();

      await user.hover(leftSliderInput);
      const leftTooltipPopup = await screen.findByTestId('left-tooltip-popup');
      expect(leftTooltipPopup).toBeInTheDocument();
      expect(leftTooltipPopup).toHaveTextContent(min);
    });
  });

  //====================
  // Icon Segmented Control
  //====================
  describe('The icon segmented control', () => {
    const type = 'icon';

    //==================== RENDERING ====================
    test('should contain a single input type=range', () => {
      render(<SegmentedControl type={type} items={[{}]} />);
      const leftSliderInput = screen.getByTestId('left-slider');

      expect(leftSliderInput).toBeInTheDocument();
      expect(leftSliderInput).toHaveAttribute('type', 'range');
      expect(screen.getAllByRole('slider')).toHaveLength(1);
    });

    //========== MIMICKING USER INTERACTIONS ==========

    test('should display the tooptip containing the value on hover', async () => {
      const user = userEvent.setup();
      render(<SegmentedControl type={type} min={min} max={max} />);
      const leftSliderInput = screen.getByTestId('left-slider');

      expect(leftSliderInput).toBeEnabled();

      await user.hover(leftSliderInput);
      const leftTooltipPopup = await screen.findByTestId('left-tooltip-popup');
      expect(leftTooltipPopup).toBeInTheDocument();
      expect(leftTooltipPopup).toHaveTextContent(min);
    });
  });
});
