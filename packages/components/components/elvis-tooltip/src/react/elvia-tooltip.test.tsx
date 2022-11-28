import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from './elvia-tooltip';
import { TooltipProps } from './elviaTooltip.types';

const tooltipContent = 'Tooltip content';
const triggerText = 'Trigger';
const renderTooltip = (opts?: Partial<TooltipProps>) => {
  render(
    <Tooltip
      content={<span>{tooltipContent}</span>}
      showDelay={0}
      trigger={<button>{triggerText}</button>}
      {...opts}
    ></Tooltip>,
  );
};

describe('Elvis Tooltip', () => {
  describe('with default settings', () => {
    beforeEach(() => {
      renderTooltip();
    });

    it('should initially not show a tooltip', () => {
      const tooltip = screen.queryByText(tooltipContent);
      expect(tooltip).not.toBeInTheDocument();
    });

    it('should show the trigger', () => {
      const trigger = screen.queryByText(triggerText);
      expect(trigger).toBeInTheDocument();
    });

    it('should show the tooltip when the trigger is hovered and hide when unhovered', async () => {
      const user = userEvent.setup();
      const trigger = screen.getByText(triggerText);

      await user.hover(trigger);
      await waitFor(() => expect(screen.queryByText(tooltipContent)).toBeInTheDocument());
    });
  });

  describe('which is disabled', () => {
    beforeEach(() => {
      renderTooltip({ isDisabled: true });
    });

    it('should not show the tooltip when the trigger is hovered', async () => {
      const user = userEvent.setup();
      const trigger = screen.getByText(triggerText);

      await user.hover(trigger);

      expect(screen.queryByText(tooltipContent)).not.toBeInTheDocument();
    });
  });

  describe('with a custom display prop', () => {
    beforeEach(() => {
      renderTooltip({ display: 'flow' });
    });

    it('should apply the display prop to the trigger container', async () => {
      const trigger = screen.getByText(triggerText);
      expect(trigger.parentElement).toHaveStyle('display: flow');
    });
  });
});
