import React from 'react';
import '@testing-library/jest-dom';
import SegmentedControl from './elvia-segmented-control';
import userEvent from '@testing-library/user-event';
import { IconSegmentedControl } from './elviaSegmentedControl.types';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';

describe('Elvia Segmented Control', () => {
  describe('The default segmented control', () => {
    const items = [{ label: 'Weekly' }, { label: 'Monthly' }, { label: 'Yearly' }];

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

    test('should have label text = item.label', () => {
      render(<SegmentedControl items={items} value={1} />);
      const segmentedControlText = screen.queryAllByTestId('segmented-control-text');

      expect(segmentedControlText[0]).toHaveTextContent(items[0].label);
    });

    test('should change value when clicked', async () => {
      const user = userEvent.setup();
      render(<SegmentedControl items={items} />);
      const segmentedControlSelectedInput = screen.queryAllByTestId('segmented-control-input');

      await user.click(segmentedControlSelectedInput[2]);
      expect(segmentedControlSelectedInput[2]).toBeChecked();
    });
  });

  describe('The icon segmented control', () => {
    const items: IconSegmentedControl[] = [
      {
        icon: '<i class="e-icon e-icon--thumbnail"></i>',
        iconSelected: '<i class="e-icon e-icon--thumbnail-color"></i>',
        ariaLabel: 'label',
      },
      {
        icon: '<i class="e-icon e-icon--thumbnail"></i>',
        iconSelected: '<i class="e-icon e-icon--thumbnail-color"></i>',
        ariaLabel: 'label',
      },
    ];

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

  describe('Events', () => {
    const valueOnChangeEvent = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();

      render(
        <SegmentedControl
          items={[{ label: 'Weekly' }, { label: 'Monthly' }, { label: 'Yearly' }]}
          valueOnChange={valueOnChangeEvent}
        />,
      );
    });

    it('should not emit any events on init', async () => {
      await waitFor(() => expect(valueOnChangeEvent).not.toHaveBeenCalled());
    });

    it('valueOnChange: should emit when the values changes', async () => {
      const user = userEvent.setup();
      const controls = screen.getAllByRole('radio');

      await user.click(controls[2]);

      await waitFor(() => expect(valueOnChangeEvent).toHaveBeenCalledTimes(1));
    });
  });

  describe('the accessibility', () => {
    const items = [{ label: 'Weekly' }, { label: 'Monthly' }, { label: 'Yearly' }];
    const iconItems: IconSegmentedControl[] = [
      {
        icon: '<i class="e-icon e-icon--thumbnail"></i>',
        iconSelected: '<i class="e-icon e-icon--thumbnail-color"></i>',
        ariaLabel: 'label',
      },
      {
        icon: '<i class="e-icon e-icon--thumbnail"></i>',
        iconSelected: '<i class="e-icon e-icon--thumbnail-color"></i>',
        ariaLabel: 'label',
      },
    ];

    it('should have no axe violations', async () => {
      render(
        <div data-testid="segmented-controls">
          <SegmentedControl items={items} />
          <SegmentedControl items={items} />
          <SegmentedControl type="icon" items={iconItems} />
          <SegmentedControl type="icon" items={iconItems} />
        </div>,
      );

      const segmentedControls = screen.getByTestId('segmented-controls');
      const results = await axe(segmentedControls);

      expect(results).toHaveNoViolations();
    });
  });
});
