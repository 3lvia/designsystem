import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Outline from './elvia-outline';

describe('Elvis Outline', () => {
  beforeEach(() => {
    render(
      <>
        <button>Button 1</button>
        <button>Button 2</button>
        <Outline />
      </>,
    );
  });

  it('should initially not show an outline', () => {
    expect(screen.queryByTestId('outline')).not.toBeInTheDocument();
  });

  it('should not show an outline when a button is clicked', async () => {
    const user = userEvent.setup();

    await user.click(screen.getByText('Button 1'));

    expect(screen.queryByTestId('outline')).not.toBeInTheDocument();
  });

  it('should show an outline over the focused element when its focused via keyboard', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('Button 1');

    await user.tab();

    const outline = screen.getByTestId('outline');
    expect(outline).toBeInTheDocument();

    const buttonPosition = button.getBoundingClientRect();
    const outlinePosition = outline.getBoundingClientRect();

    expect(outlinePosition.top).toBe(buttonPosition.top);
    expect(outlinePosition.left).toBe(buttonPosition.left);
    expect(outlinePosition.width).toBe(buttonPosition.width);
    expect(outlinePosition.height).toBe(buttonPosition.height);
  });
});
