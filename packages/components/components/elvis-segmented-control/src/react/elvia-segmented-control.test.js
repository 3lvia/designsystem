import '@testing-library/jest-dom';
import React from 'react';
import SegmentedControl from './elvia-segmented-control.tsx';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

//========================
// Text Segmented Control
//========================
describe('Elvia Segmented Control', () => {
  describe('The default segmented control', () => {
    const items = [{ name: 'Weekly' }, { name: 'Monthly' }, { name: 'Yearly' }];

    //==================== RENDERING ====================
    test('should contain text', () => {
      render(<SegmentedControl items={items} />);
      const segmentedControlText = screen.queryAllByTestId('segmented-control-text');
      const segmentedControlIcon = screen.queryAllByTestId('segmented-control-icon');

      expect(segmentedControlText).toHaveLength(items.length);
      expect(segmentedControlIcon).toStrictEqual([]);
    });

    test('should have value = 0', () => {
      render(<SegmentedControl items={items} />);
      const segmentedControlSelectedInput = screen.queryAllByTestId('segmented-control-input');

      expect(segmentedControlSelectedInput[0]).toBeChecked();
    });

    test('should have value = 1, when prop value={1}', () => {
      render(<SegmentedControl items={items} value={1} />);
      const segmentedControlSelectedInput = screen.queryAllByTestId('segmented-control-input');

      expect(segmentedControlSelectedInput[1]).toBeChecked();
    });

    //========== MIMICKING USER INTERACTIONS ==========
    test('should change value when clicked', async () => {
      const user = userEvent.setup();
      render(<SegmentedControl items={items} />);
      const segmentedControlSelectedInput = screen.queryAllByTestId('segmented-control-input');

      await user.click(segmentedControlSelectedInput[2]);
      expect(segmentedControlSelectedInput[2]).toBeChecked();
    });
  });

  describe('The icon segmented control', () => {
    const items = [
      { name: 'thumbnail', ariaLabel: 'label' },
      { name: 'list', ariaLabel: 'label' },
    ];

    //==================== RENDERING ====================
    test('should contain icon', () => {
      render(<SegmentedControl type="icon" items={items} />);
      const segmentedControlText = screen.queryAllByTestId('segmented-control-text');
      const segmentedControlIcon = screen.queryAllByTestId('segmented-control-icon');

      expect(segmentedControlText).toStrictEqual([]);
      expect(segmentedControlIcon).toHaveLength(items.length);
    });

    test('should have aria-label', () => {
      render(<SegmentedControl type="icon" items={items} />);
      const segmentedControlLabel = screen.queryAllByTestId('segmented-control-label');

      expect(segmentedControlLabel[0]).toHaveAttribute('aria-label', 'label');
    });
  });
});
