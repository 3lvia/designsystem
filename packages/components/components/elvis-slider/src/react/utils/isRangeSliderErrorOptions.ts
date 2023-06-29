import { RangeSliderErrorOptions, SliderProps } from '../elvia-slider.types';
/**
 * Checks if the provided error options object is an instance of RangeSliderErrorOptions.
 * @example 
 * const doSomethingWithErrorOptions = () => {
    if (isRangeSliderErrorOptions(errorOptions)) {
      //use errorOptions.left and errorOptions.right here
    } else {
      // errorOptions.left and errorOptions.right are undefined here
    }
  };
 */
export const isRangeSliderErrorOptions = (
  errorOptions?: SliderProps['errorOptions'],
): errorOptions is RangeSliderErrorOptions => {
  return !!(errorOptions && ('left' in errorOptions || 'right' in errorOptions));
};
