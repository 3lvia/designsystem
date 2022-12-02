import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContextMenu from './elvia-context-menu';

describe('Elvis Context Menu', () => {
  beforeEach(() => {
    render(
      <ContextMenu
        trigger={<button data-testid="trigger">Trigger</button>}
        content={
          <div data-testid="menu">
            <div className="ewc-popover__list-group">
              <button>
                <span>Be om tilgang</span>
              </button>
              <button>
                <span>Legg til bruker</span>
              </button>
            </div>
            <div className="ewc-popover__list-group">
              <a href="#">
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

      await user.click(screen.getByText('Be om tilgang'));

      await waitForElementToBeRemoved(() => screen.queryByText('Be om tilgang'));
    });

    it('the first option receives focus', () => {
      const menu = screen.getByTestId('menu');
      const buttons: NodeListOf<HTMLButtonElement | HTMLAnchorElement> = menu.querySelectorAll('button, a');
      expect(buttons.length).toBe(3);
      expect(buttons.item(0).tabIndex).toBe(0);
      expect(buttons.item(1).tabIndex).toBe(-1);
      expect(buttons.item(2).tabIndex).toBe(-1);
    });

    it('arrow down will focus the next item in the list', async () => {
      const user = userEvent.setup();
      await user.keyboard('{arrowdown}');

      const menu = screen.getByTestId('menu');
      const buttons: NodeListOf<HTMLButtonElement | HTMLAnchorElement> = menu.querySelectorAll('button, a');
      expect(buttons.item(0).tabIndex).toBe(-1);
      expect(buttons.item(1).tabIndex).toBe(0);
      expect(buttons.item(2).tabIndex).toBe(-1);
    });

    it('arrow up will focus the last item in the list', async () => {
      const user = userEvent.setup();
      await user.keyboard('{arrowup}');

      const menu = screen.getByTestId('menu');
      const buttons: NodeListOf<HTMLButtonElement | HTMLAnchorElement> = menu.querySelectorAll('button, a');
      expect(buttons.item(0).tabIndex).toBe(-1);
      expect(buttons.item(1).tabIndex).toBe(-1);
      expect(buttons.item(2).tabIndex).toBe(0);
    });
  });
});
