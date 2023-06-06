import { BothSliders, Sides, SliderType, SliderValues } from '../elvia-slider.types';

export const getAriaLabel = ({
  side,
  sliderValues,
  type = 'simple',
  ariaLabel,
  heading,
  unit,
}: {
  side: Sides;
  sliderValues: SliderValues;
  type?: SliderType;
  ariaLabel?: string | BothSliders<string>;
  heading?: string;
  unit?: string;
}): string => {
  if (ariaLabel) {
    return returnAriaLabelFromProp(side, ariaLabel);
  } else {
    return generateAutomaticAriaLabel(side, type, sliderValues, heading, unit);
  }
};

const returnAriaLabelFromProp = (side: Sides, ariaLabel: string | Record<Sides, string>): string => {
  if (typeof ariaLabel === 'object') {
    return ariaLabel[side];
  }

  if (typeof ariaLabel === 'string') {
    return ariaLabel;
  }

  return 'Glidebryter';
};

const generateAutomaticAriaLabel = (
  side: Sides,
  type: SliderType,
  sliderValues: SliderValues,
  heading?: string,
  unit?: string,
): string => {
  let newAriaLabel = 'Glidebryter';

  if (type === 'range') {
    const prefix = side === 'left' ? 'Startverdi' : 'Sluttverdi';

    newAriaLabel = `${prefix} ${heading ?? ''} rekkeviddeglidebryter ${
      unit ? ' med verdi ' + sliderValues[side] + unit : ''
    }`;
  }

  if (type === 'simple' && (heading || unit)) {
    newAriaLabel = `${heading ?? ''} ${unit ? +sliderValues.left + unit : ''}`;
  }

  return newAriaLabel.replace(/\s+/g, ' ').trim();
};
