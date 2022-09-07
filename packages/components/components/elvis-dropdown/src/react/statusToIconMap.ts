import type { ElviaColor } from '@elvia/elvis-colors';
import type { IconName } from '@elvia/elvis-icon/react';

export type DropdownItemStatus = 'error' | 'warning' | 'info' | 'informative';

type StatusToIconMap = {
  [key in DropdownItemStatus]: { name: IconName; color?: ElviaColor };
};

export const statusToIconMap: StatusToIconMap = {
  error: { name: 'removeCircle', color: 'error' },
  warning: { name: 'warningCircle', color: 'warning' },
  info: { name: 'informationCircle' },
  informative: { name: 'informationCircle' }, // Make it possible to set status as either 'info' or 'informative'
};
