import React from 'react';
import Toast from './elvia-toast';
import { render, screen } from '@testing-library/react';

const renderToast = () => {
  render(<Toast></Toast>);
};

const toastDescription = 'Toast description';
describe('Elvis Toast', () => {
  describe('with default settings', () => {
    beforeEach(() => {
      renderToast();
    });

    it('should initially not show an toast', () => {
      const toast = screen.queryByText(toastDescription);
      expect(toast).not.toBeInTheDocument();
    });
  });
});
