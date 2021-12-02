import React from 'react';
import * as elvisIcons from '@elvia/elvis-assets-icons';

export type IconSizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type iconDisplay = 'inline' | 'block';

interface IconProps {
  iconName: string;
  iconColor?: string;
  iconSize?: IconSizes;
  customSize?: string;
  iconDisplay: iconDisplay;
}
export const ElvisIcon: React.FC<IconProps> = ({
  iconName = '',
  iconColor,
  iconSize,
  customSize,
  iconDisplay = 'inline',
}) => {
  const getIcon = (icon: string, color?: string): string => {
    let newIcon = undefined;

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
    return newIcon;
  };

  const getIconSize = (icon: string, iconSize?: IconSizes, customSize?: string): string => {
    let NewIcon = undefined;
    let definedSize;

    if (iconSize !== undefined) {
      switch (iconSize) {
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
        default:
          definedSize = '24px';
          break;
      }
    }

    if (customSize !== undefined) {
      definedSize = customSize;
    }
    // regex to find width and height properties in svg string from elvis/assets-icons
    const wReg = /width="([^"]*)"/;
    const hReg = /height="([^"]*)"/;
    NewIcon = icon.replace(wReg, `width="${definedSize}"`).replace(hReg, `height="${definedSize}"`);
    return NewIcon;
  };

  let displayIcon = getIcon(iconName, iconColor);

  if (displayIcon && iconSize && !customSize) {
    displayIcon = getIconSize(displayIcon, iconSize);
  } else if (displayIcon && !iconSize && customSize) {
    displayIcon = getIconSize(displayIcon, undefined, customSize);
  } else {
    displayIcon = getIconSize(displayIcon, 'sm');
  }

  return (
    <i
      style={{
        display: iconDisplay,
      }}
      dangerouslySetInnerHTML={{ __html: displayIcon }}
      aria-hidden="true"
      role="img"
    />
  );
};

export default ElvisIcon;
