import { LanguageCode } from '@elvia/elvis-toolbox/src/hooks/useLanguage';

import { BothSliders, Side, SliderProps, SliderType } from '../elvia-slider.types';

export const getAriaLabel = ({
  side,
  sliderValue,
  type = 'simple',
  ariaLabel,
  label,
  unit,
  lang,
}: {
  side: Side;
  sliderValue: BothSliders<number>;
  type?: SliderType;
  ariaLabel?: SliderProps['ariaLabel'];
  label?: string;
  unit?: string;
  lang: LanguageCode;
}): string => {
  if (ariaLabel) {
    return returnAriaLabelFromProp(side, ariaLabel, lang);
  } else {
    return generateAutomaticAriaLabel(side, type, sliderValue, lang, label, unit);
  }
};

const returnAriaLabelFromProp = (
  side: Side,
  ariaLabel: SliderProps['ariaLabel'],
  lang: LanguageCode,
): string => {
  if (typeof ariaLabel === 'object') {
    return ariaLabel[side];
  }

  if (typeof ariaLabel === 'string') {
    return ariaLabel;
  }

  if (lang === 'no') {
    return 'Glidebryter';
  } else {
    return 'Slider';
  }
};

const generateAutomaticAriaLabel = (
  side: Side,
  type: SliderType,
  sliderValue: BothSliders<number>,
  lang: LanguageCode,
  label?: string,
  unit?: string,
): string => {
  let newAriaLabel = lang === 'no' ? 'Glidebryter' : 'Slider';

  if (type === 'range') {
    if (lang === 'no') {
      const prefix = side === 'left' ? 'Startverdi' : 'Sluttverdi';

      newAriaLabel = `${prefix} ${label ?? ''} rekkeviddeglidebryter ${
        unit ? ' med verdi ' + sliderValue[side] + unit : ''
      }`;
    } else {
      const prefix = side === 'left' ? 'Startvalue' : 'Endvalue';

      newAriaLabel = `${prefix} ${label ?? ''} range slider ${unit ? ' with value ' + sliderValue[side] + unit : ''}`;
    }
  }

  if (type === 'simple' && (label || unit)) {
    newAriaLabel = `${label ?? ''} ${unit ? +sliderValue.left + unit : ''}`;
  }

  return newAriaLabel.replace(/\s+/g, ' ').trim();
};

export const getFormFieldLabel = (label: string | undefined, lang: LanguageCode): string => {
  if (label) {
    return label;
  } else if (lang === 'no') {
    return 'juster glidebryter';
  } else {
    return 'adjust slider';
  }
};
