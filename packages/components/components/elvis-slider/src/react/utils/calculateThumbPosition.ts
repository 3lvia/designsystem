import { BothSliders, Sides } from '../elvia-slider.types';

/**
 * Calculates the position of a thumb on a slider, in px from the left side of the slider.
 * @see https://stackoverflow.com/a/61665977/14447555 by user 'ibrcic' for the original implementation.
 */
export const calculateThumbPosition = ({
  side,
  sliderValue,
  min,
  max,
  totalSliderWidth,
  thumbWidth,
}: {
  side: Sides;
  sliderValue: BothSliders<number>;
  min: number;
  max: number;
  totalSliderWidth: number;
  thumbWidth: number;
}) => {
  if (side === 'left') {
    return ((sliderValue.left - min) / (max - min)) * (totalSliderWidth - thumbWidth) + thumbWidth / 2;
  } else {
    return ((sliderValue.right - max) / (min - max)) * (totalSliderWidth - thumbWidth) + thumbWidth / 2;
  }
};
