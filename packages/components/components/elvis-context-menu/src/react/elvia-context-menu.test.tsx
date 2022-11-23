import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContextMenu from './elvia-context-menu';

describe('Elvis Context Menu', () => {
  beforeEach(() => {
    render(
      <ContextMenu
        hasDivider
        trigger={<button data-testid="trigger">Trigger</button>}
        content={
          <div data-testid="dropdown-list">
            <div className="ewc-popover__list-group">
              <button>
                <span>Be om tilgang</span>
              </button>
              <button>
                <span>Legg til bruker</span>
              </button>
            </div>
            <div className="ewc-popover__list-group">
              <a>
                <span>Endre passord</span>
              </a>
            </div>
          </div>
        }
      />,
    );
  });

  it('should render a trigger', () => {
    const element = screen.queryByTestId('trigger');
    expect(element).toBeInTheDocument();
  });

  describe('when the trigger is clicked', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      await user.click(screen.getByTestId('trigger'));
    });

    it('a context menu is visible', () => {
      const menuItem = screen.queryByText('Be om tilgang');
      expect(menuItem).toBeInTheDocument();
    });

    it('the context menu closes when an item is selected', async () => {
      const user = userEvent.setup();

      const menuItem = screen.getByText('Be om tilgang');
      await user.click(menuItem);

      expect(menuItem).not.toBeInTheDocument();
    });
  });
});
