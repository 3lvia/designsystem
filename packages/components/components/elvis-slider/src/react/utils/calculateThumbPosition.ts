import { Sides, SliderValues } from '../elvia-slider.types';

/**
 * Calculates the position of a thumb on a slider, in px from the left side of the slider.
 * @see https://stackoverflow.com/a/61665977/14447555 by user 'ibrcic' for the original implementation.
 */
export const calculateThumbPosition = ({
  side,
  sliderValues,
  min,
  max,
  totalSliderWidth,
  thumbWidth,
}: {
  side: Sides;
  sliderValues: SliderValues;
  min: number;
  max: number;
  totalSliderWidth: number;
  thumbWidth: number;
}) => {
  if (side === 'left') {
    return ((sliderValues.left - min) / (max - min)) * (totalSliderWidth - thumbWidth) + thumbWidth / 2;
  } else {
    return ((sliderValues.right - max) / (min - max)) * (totalSliderWidth - thumbWidth) + thumbWidth / 2;
  }
};
