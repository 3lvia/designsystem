import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Overlay } from './overlay';

describe('Overlay', () => {
  let onCloseEvent: jest.Mock;

  beforeEach(() => {
    onCloseEvent = jest.fn();

    render(
      <Overlay onClose={onCloseEvent}>
        <p>Overlay content</p>
      </Overlay>,
    );
  });

  it('should display the content', () => {
    expect(screen.queryByText('Overlay content')).toBeInTheDocument();
  });

  it('should close when the Escape key is pressed', async () => {
    const user = userEvent.setup();

    await user.keyboard('{Escape}');

    await waitFor(() => expect(onCloseEvent).toHaveBeenCalledTimes(1));
  });

  it('should not close when a different key is pressed', async () => {
    const user = userEvent.setup();

    await user.keyboard('{Enter}');

    await waitFor(() => expect(onCloseEvent).not.toHaveBeenCalled());
  });

  it('should close when the backdrop is clicked', async () => {
    const user = userEvent.setup();

    await user.click(screen.getByTestId('backdrop'));

    await waitFor(() => expect(onCloseEvent).toHaveBeenCalledTimes(1));
  });

  it('should not close when the overlay content is clicked', async () => {
    const user = userEvent.setup();

    await user.click(screen.getByText('Overlay content'));

    await waitFor(() => expect(onCloseEvent).not.toHaveBeenCalled());
  });
});
