import React from 'react';
import Toast from './elvia-toast';
import { axe } from 'jest-axe';
import { act, render, screen, waitFor } from '@testing-library/react';
import { openElviaToast, ToastConfig } from './publicApi.public';

const toastTitle = 'Toast title';
const toastBody = 'Toast description';
const toastDuration = 10;

const mockMatchMedia = (opts?: Partial<{ isGtMobile: boolean }>) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: opts?.isGtMobile,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

const openToast = (config?: Partial<ToastConfig>) => {
  act(() => {
    openElviaToast({
      title: toastTitle,
      body: toastBody,
      duration: toastDuration,
      ...config,
    });
  });
};

describe('Elvis Toast', () => {
  beforeEach(() => {
    mockMatchMedia({ isGtMobile: true });
    render(<Toast></Toast>);
  });

  it('should initially not show an toast', () => {
    const toast = screen.queryByText(toastBody);
    expect(toast).not.toBeInTheDocument();
  });

  it('should show the toast title when it is open', async () => {
    openToast();

    await waitFor(() => {
      const element = screen.getByText(toastTitle);
      expect(element).toBeInTheDocument();
    });
  });

  it('should show the toast body when it is open', async () => {
    openToast();

    await waitFor(() => {
      const element = screen.getByText(toastBody);
      expect(element).toBeInTheDocument();
    });
  });

  it('should not have a close button initially', async () => {
    openToast();

    await waitFor(() => {
      const element = screen.queryByTestId('close-btn');
      expect(element).not.toBeInTheDocument();
    });
  });

  it('should have a close button when the config says so', async () => {
    openToast({ closable: true });

    await waitFor(() => {
      const element = screen.queryByTestId('close-btn');
      expect(element).toBeInTheDocument();
    });
  });

  it('should be possible to have a custom icon', async () => {
    openToast({ customIcon: '<p data-testid="custom-icon">Custom icon</p>' });

    await waitFor(() => {
      const element = screen.queryByTestId('custom-icon');
      expect(element).toBeInTheDocument();
    });
  });

  it('should have no axe violations', async () => {
    openToast({ closable: true });

    const toast = screen.getByRole('status');
    const results = await axe(toast);

    expect(results).toHaveNoViolations();
  });
});
