import Carousel from './elvia-carousel';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';

describe('Elvis Carousel', () => {
  const items = [
    { heading: 'Item 1', item: <p>Body text 1</p> },
    { heading: 'Item 2', item: <p>Body text 2</p> },
    { heading: 'Item 3', item: <p>Body text 3</p> },
    { heading: 'Item 4', item: <p>Body text 4</p> },
  ];

  describe('Default', () => {
    beforeEach(() => {
      render(<Carousel items={items} />);
    });

    it('should have right amount of dots', () => {
      const carouselDots = screen.getAllByTestId('carousel-dot');
      expect(carouselDots.length).toEqual(4);
    });

    it('should have default value 0', () => {
      const carouselItemHeading = screen.getByTestId('carousel-item-heading');
      const carouselItem = screen.getByTestId('carousel-item');
      expect(carouselItemHeading).toHaveTextContent('Item 1');
      expect(carouselItem).toHaveTextContent('Body text 1');
    });

    it('should have aria-labels', () => {
      const carouselDots = screen.getAllByTestId('carousel-dot');
      expect(carouselDots[0]).toHaveAttribute('aria-label', 'Du er på side 1');
      expect(carouselDots[1]).toHaveAttribute('aria-label', 'Gå til side 2');
      expect(carouselDots[2]).toHaveAttribute('aria-label', 'Gå til side 3');
      expect(carouselDots[3]).toHaveAttribute('aria-label', 'Gå til side 4');

      const carouselLeftArrow = screen.getByTestId('carousel-left-arrow');
      expect(carouselLeftArrow).toHaveAttribute('aria-label', 'Gå til forrige side');

      const carouselRightArrow = screen.getByTestId('carousel-right-arrow');
      expect(carouselRightArrow).toHaveAttribute('aria-label', 'Gå til neste side');
    });

    it('should update selected item using dots ', async () => {
      const user = userEvent.setup();
      const carouselDots = screen.getAllByTestId('carousel-dot');

      await user.click(carouselDots[2]);

      await waitFor(() => {
        const carouselItemHeading = screen.getByTestId('carousel-item-heading');
        expect(carouselItemHeading).toHaveTextContent('Item 3');

        const carouselItem = screen.getByTestId('carousel-item');
        expect(carouselItem).toHaveTextContent('Body text 3');
      });
    });

    it('should update selected item using right arrow', async () => {
      const user = userEvent.setup();
      const carouselRightArrow = await screen.findByTestId('carousel-right-arrow');

      await user.click(carouselRightArrow);

      await waitFor(() => {
        const carouselItemHeading = screen.getByTestId('carousel-item-heading');
        expect(carouselItemHeading).toHaveTextContent('Item 2');
      });
    });

    it('should update selected item using left arrow', async () => {
      const user = userEvent.setup();
      const carouselLeftArrow = screen.getByTestId('carousel-left-arrow');

      await user.click(carouselLeftArrow);

      await waitFor(() => {
        const carouselItemHeading = screen.getByTestId('carousel-item-heading');
        expect(carouselItemHeading).toHaveTextContent('Item 4');
      });
    });
  });

  describe('Items = number', () => {
    beforeEach(() => {
      render(<Carousel items={5} />);
    });

    it('should have right amount of dots', () => {
      const carouselDots = screen.getAllByTestId('carousel-dot');
      expect(carouselDots.length).toEqual(5);
    });

    it('should not have any items', () => {
      const carouselItem = screen.queryByTestId('carousel-item');
      expect(carouselItem).not.toBeInTheDocument();
    });
  });

  describe('Value = 2', () => {
    beforeEach(() => {
      render(<Carousel items={items} value={2} />);
    });

    it('should have new default value 2', () => {
      const carouselItemHeading = screen.getByTestId('carousel-item-heading');
      expect(carouselItemHeading).toHaveTextContent('Item 3');

      const carouselItem = screen.getByTestId('carousel-item');
      expect(carouselItem).toHaveTextContent('Body text 3');
    });
  });

  describe('Type = "linear"', () => {
    beforeEach(() => {
      render(<Carousel items={items} type="linear" />);
    });

    it('should hide arrow at the left end', () => {
      const carouselLeftArrow = screen.getByTestId('carousel-left-arrow');
      expect(carouselLeftArrow).toHaveAttribute('hidden');

      const carouselRightArrow = screen.getByTestId('carousel-right-arrow');
      expect(carouselRightArrow).not.toHaveAttribute('hidden');
    });

    it('should hide arrow at the right end', async () => {
      const user = userEvent.setup();
      const carouselDots = screen.getAllByTestId('carousel-dot');

      await user.click(carouselDots[carouselDots.length - 1]);

      await waitFor(() => {
        const carouselLeftArrow = screen.getByTestId('carousel-left-arrow');
        expect(carouselLeftArrow).not.toHaveAttribute('hidden');

        const carouselRightArrow = screen.getByTestId('carousel-right-arrow');
        expect(carouselRightArrow).toHaveAttribute('hidden');
      });
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(<Carousel items={items} className="test-class" inlineStyle={{ margin: '24px' }} />);
    });

    it('should have className and inlineStyle', () => {
      const carouselContainer = screen.getByRole('group');
      expect(carouselContainer).toHaveClass('test-class');
      expect(carouselContainer).toHaveStyle('margin: 24px');
    });
  });

  describe('Onboarding Checkmark  = true', () => {
    beforeEach(() => {
      render(<Carousel items={items} type="linear" hasConfirmationCheckmark={true} />);
    });

    it('should show onboarding checkmark at right end', async () => {
      const user = userEvent.setup();
      const onboardingCheckmark = screen.queryByTestId('carousel-onboarding-checkmark');
      expect(onboardingCheckmark).not.toBeInTheDocument();

      const carouselDots = screen.getAllByTestId('carousel-dot');
      await user.click(carouselDots[carouselDots.length - 1]);

      const newCheckmark = await screen.findByTestId('carousel-onboarding-checkmark');
      expect(newCheckmark).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    const onFinishEvent = jest.fn();
    const valueOnChangeEvent = jest.fn();
    beforeEach(() => {
      jest.clearAllMocks();

      render(
        <Carousel
          hasConfirmationCheckmark={true}
          items={items}
          onFinish={onFinishEvent}
          type={'linear'}
          valueOnChange={valueOnChangeEvent}
        />,
      );
    });

    it('should not emit events when idle', async () => {
      await waitFor(() => expect(onFinishEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(valueOnChangeEvent).not.toHaveBeenCalled());
    });

    it('onFinishEvent: should be called when the carousel is completed', async () => {
      const user = userEvent.setup();

      const lastCarouselDot = screen.getAllByTestId('carousel-dot')[items.length - 1];
      await user.click(lastCarouselDot);

      const checkmark = await screen.findByTestId('carousel-onboarding-checkmark');
      await user.click(checkmark);

      await waitFor(() => expect(onFinishEvent).toHaveBeenCalledTimes(1));
    });

    it('valueOnChangeEvent: should be called when the value is changed', async () => {
      const user = userEvent.setup();

      const carouselDots = screen.getAllByTestId('carousel-dot');
      await user.click(carouselDots[1]);

      await waitFor(() => expect(valueOnChangeEvent).toHaveBeenCalledTimes(1));
    });
  });

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="carousels">
          <Carousel items={items} />
          <Carousel items={items} />
        </div>,
      );

      const carousels = screen.getByTestId('carousels');
      const results = await axe(carousels);

      expect(results).toHaveNoViolations();
    });
  });
});
