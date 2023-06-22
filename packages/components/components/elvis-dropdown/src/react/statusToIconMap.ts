import type { IconType } from '@elvia/elvis-assets-icons/dist/icons/_iconType';
import removeCircle from '@elvia/elvis-assets-icons/dist/icons/removeCircle';
import warningCircle from '@elvia/elvis-assets-icons/dist/icons/warningCircle';
import informationCircle from '@elvia/elvis-assets-icons/dist/icons/informationCircle';
import { ColorLabel } from '@elvia/elvis-colors';
import { DropdownItemStatus } from './sharedTypes';

type StatusToIconMap = {
  [key in DropdownItemStatus]: { icon: IconType; color?: ColorLabel };
};

export const statusToIconMap: StatusToIconMap = {
  error: { icon: removeCircle, color: 'icon-error' },
  warning: { icon: warningCircle, color: 'icon-warning' },
  info: { icon: informationCircle },
  informative: { icon: informationCircle }, // Make it possible to set status as either 'info' or 'informative'
};
