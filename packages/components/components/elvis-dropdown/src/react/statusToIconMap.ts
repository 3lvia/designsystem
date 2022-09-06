import type { ElviaColor } from '@elvia/elvis-colors';
import type { IconName } from '@elvia/elvis-icon/react';

export type DropdownItemStatus = 'error' | 'warning' | 'info';

type StatusToIconMap = {
  [key in DropdownItemStatus]: { name: IconName; color?: ElviaColor };
};

export const statusToIconMap: StatusToIconMap = {
  error: { name: 'removeCircle', color: 'error' },
  warning: { name: 'warningCircle', color: 'warning' },
  info: { name: 'informationCircle' },
};
