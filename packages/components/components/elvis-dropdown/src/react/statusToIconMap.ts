import type { IconType } from '@elvia/elvis-assets-icons/dist/icons/_iconType';
import type { ElviaColor } from '@elvia/elvis-colors';
import removeCircle from '@elvia/elvis-assets-icons/dist/icons/removeCircle';
import warningCircle from '@elvia/elvis-assets-icons/dist/icons/warningCircle';
import informationCircle from '@elvia/elvis-assets-icons/dist/icons/informationCircle';

export type DropdownItemStatus = 'error' | 'warning' | 'info' | 'informative';

type StatusToIconMap = {
  [key in DropdownItemStatus]: { icon: IconType; color?: ElviaColor };
};

export const statusToIconMap: StatusToIconMap = {
  error: { icon: removeCircle, color: 'error' },
  warning: { icon: warningCircle, color: 'warning' },
  info: { icon: informationCircle },
  informative: { icon: informationCircle }, // Make it possible to set status as either 'info' or 'informative'
};
