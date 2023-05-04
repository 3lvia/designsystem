import type { IconType } from '@elvia/elvis-assets-icons/dist/icons/_iconType';
import removeCircle from '@elvia/elvis-assets-icons/dist/icons/removeCircle';
import warningCircle from '@elvia/elvis-assets-icons/dist/icons/warningCircle';
import informationCircle from '@elvia/elvis-assets-icons/dist/icons/informationCircle';
import { getThemeColor } from '@elvia/elvis-colors';

export type DropdownItemStatus = 'error' | 'warning' | 'info' | 'informative';

type StatusToIconMap = {
  [key in DropdownItemStatus]: { icon: IconType; color?: string };
};

export const statusToIconMap: StatusToIconMap = {
  error: { icon: removeCircle, color: getThemeColor('signal-error') },
  warning: { icon: warningCircle, color: getThemeColor('signal-warning') },
  info: { icon: informationCircle },
  informative: { icon: informationCircle }, // Make it possible to set status as either 'info' or 'informative'
};
