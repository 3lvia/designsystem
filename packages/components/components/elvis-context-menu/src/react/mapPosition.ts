import { type Placement } from '@floating-ui/react';

import { type HorizontalPosition, type VerticalPosition } from './elviaContextMenu.types';

export const mapPosition = (vertical: VerticalPosition, horizontal: HorizontalPosition): Placement => {
  switch (vertical) {
    case 'top':
      switch (horizontal) {
        case 'left':
          return 'top-start';
        case 'right':
          return 'top-end';
      }
      break;
    case 'bottom':
      switch (horizontal) {
        case 'left':
          return 'bottom-start';
        case 'right':
          return 'bottom-end';
      }
      break;
  }
};
