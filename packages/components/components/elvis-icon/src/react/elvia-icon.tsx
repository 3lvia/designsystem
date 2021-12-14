import React from 'react';
import * as elvisIcons from '@elvia/elvis-assets-icons';

export type IconSizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface IconProps {
  name: string;
  color?: string;
  size?: IconSizes;
  customSize?: string;
}
export const Icon: React.FC<IconProps> = ({ name, color, size = 'sm', customSize }) => {
  const getIcon = (icon: string, size: IconSizes, color?: string, customSize?: string): string => {
    let newIcon = undefined;
    let definedSize;

    // search and get requested icon in elvis/asses-icons
    for (const elviaIcon in elvisIcons) {
      if (elviaIcon === icon && color !== undefined) {
        newIcon = elvisIcons[icon].getIcon(color);
      } else if (elviaIcon === icon && color === undefined) {
        newIcon = elvisIcons[icon].getIcon();
      }
    }

    // console error and return if no available icon from elvis/assets-icons package
    if (newIcon === undefined) {
      console.error('No icon found with the name ' + icon);
      return `No icon found with name ${icon}`;
    }

    // find correct size according to size prop
    switch (size) {
      case 'xxs':
        definedSize = '8px';
        break;
      case 'xs':
        definedSize = '16px';
        break;
      case 'sm':
        definedSize = '24px';
        break;
      case 'md':
        definedSize = '32px';
        break;
      case 'lg':
        definedSize = '40px';
        break;
      case 'xl':
        definedSize = '48px';
        break;
      case 'xxl':
        definedSize = '56px';
        break;
    }

    // override size with customSize if it is defined
    if (customSize !== undefined) {
      definedSize = customSize;
    }
    // regex to find width and height properties in svg string from elvis/assets-icons
    const wReg = /width="([^"]*)"/;
    const hReg = /height="([^"]*)"/;
    newIcon = newIcon.replace(wReg, `width="${definedSize}"`).replace(hReg, `height="${definedSize}"`);
    return newIcon;
  };

  const displayIcon = getIcon(name, size, color, customSize);

  return <i dangerouslySetInnerHTML={{ __html: displayIcon }} aria-hidden="true" />;
};

export default Icon;
