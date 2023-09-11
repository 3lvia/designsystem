import changelogJson from '@elvia/elvis-popover/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { PopoverProps } from '@elvia/elvis-popover/react';

const popoverData: ComponentData<
  Omit<
    PopoverProps,
    | 'header'
    | 'type'
    | 'selectable'
    | 'isSelectable'
    | 'hasDivider'
    | 'posX'
    | 'posY'
    | 'hasCloseBtn'
    | 'isShowingOnChange'
    | 'disableAutoClose'
  >
> = {
  changelog: changelogJson.content,
  name: 'Popover',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text, images, tables or any other content (use slot in web component if not just text).',
    },
    trigger: {
      isRequired: true,
      type: 'HTMLElement | JSX.Element',
      description: 'The element the user clicks to open the popover.',
    },
    heading: {
      type: 'string',
      description: 'Heading of content.',
    },
    hasCloseButton: {
      type: 'boolean',
      description: 'Determines if the close button in the upper right corner should be visible.',
      default: 'true',
    },
    isShowing: {
      type: 'boolean',
      description: 'Determines if the popover is visible.',
      default: 'false',
    },
    onOpen: {
      isEvent: true,
      type: '() => void',
      description: 'Callback for every time the popover is being opened.',
    },
    onClose: {
      isEvent: true,
      type: '() => void',
      description: 'Callback for every time the popover is being closed.',
    },
    verticalPosition: {
      type: 'bottom | top',
      description: 'Position vertically.',
      default: 'top',
    },
    horizontalPosition: {
      type: 'left | center | right',
      description: 'Position horizontally.',
      default: 'center',
    },
  },
};

export { popoverData };
