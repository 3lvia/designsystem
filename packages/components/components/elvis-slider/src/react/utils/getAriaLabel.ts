import { BothSliders, Sides, SliderType } from '../elvia-slider.types';

export const getAriaLabel = ({
  side,
  sliderValue,
  type = 'simple',
  ariaLabel,
  label,
  unit,
}: {
  side: Side;
  sliderValue: BothSliders<number>;
  type?: SliderType;
  ariaLabel?: string | BothSliders<string>;
  label?: string;
  unit?: string;
}): string => {
  if (ariaLabel) {
    return returnAriaLabelFromProp(side, ariaLabel);
  } else {
    return generateAutomaticAriaLabel(side, type, sliderValue, label, unit);
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
  side: Side,
  type: SliderType,
  sliderValue: BothSliders<number>,
  label?: string,
  unit?: string,
): string => {
  let newAriaLabel = 'Glidebryter';

  if (type === 'range') {
    const prefix = side === 'left' ? 'Startverdi' : 'Sluttverdi';

    newAriaLabel = `${prefix} ${label ?? ''} rekkeviddeglidebryter ${
      unit ? ' med verdi ' + sliderValue[side] + unit : ''
    }`;
  }

  if (type === 'simple' && (label || unit)) {
    newAriaLabel = `${label ?? ''} ${unit ? +sliderValue.left + unit : ''}`;
  }

  return newAriaLabel.replace(/\s+/g, ' ').trim();
};
