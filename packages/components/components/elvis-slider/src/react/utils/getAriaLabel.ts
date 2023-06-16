import { BothSliders, Sides, SliderType } from '../elvia-slider.types';

export const getAriaLabel = ({
  side,
  sliderValue,
  type = 'simple',
  ariaLabel,
  heading,
  unit,
}: {
  side: Sides;
  sliderValue: BothSliders<number>;
  type?: SliderType;
  ariaLabel?: string | BothSliders<string>;
  heading?: string;
  unit?: string;
}): string => {
  if (ariaLabel) {
    return returnAriaLabelFromProp(side, ariaLabel);
  } else {
    return generateAutomaticAriaLabel(side, type, sliderValue, heading, unit);
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
  sliderValue: BothSliders<number>,
  heading?: string,
  unit?: string,
): string => {
  let newAriaLabel = 'Glidebryter';

  if (type === 'range') {
    const prefix = side === 'left' ? 'Startverdi' : 'Sluttverdi';

    newAriaLabel = `${prefix} ${heading ?? ''} rekkeviddeglidebryter ${
      unit ? ' med verdi ' + sliderValue[side] + unit : ''
    }`;
  }

  if (type === 'simple' && (heading || unit)) {
    newAriaLabel = `${heading ?? ''} ${unit ? +sliderValue.left + unit : ''}`;
  }

  return newAriaLabel.replace(/\s+/g, ' ').trim();
};
