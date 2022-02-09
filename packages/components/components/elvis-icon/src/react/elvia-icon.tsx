import React, { CSSProperties } from 'react';
import * as elvisIcons from '@elvia/elvis-assets-icons';

export type IconSizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface IconProps {
  name: string;
  color?: string;
  size?: IconSizes;
  customSize?: string;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
}
export const Icon: React.FC<IconProps> = ({
  name,
  color,
  size = 'sm',
  customSize,
  className,
  inlineStyle,
}) => {
  const getIcon = (icon: string, size: IconSizes, color?: string, customSize?: string): string => {
    let newIcon = undefined;

    // search and get requested icon in elvis/asses-icons
    for (const elviaIcon in elvisIcons) {
      if (elviaIcon === icon && color !== undefined) {
        newIcon = elvisIcons[icon].getIcon(color);
        break;
      } else if (elviaIcon === icon && color === undefined) {
        newIcon = elvisIcons[icon].getIcon();
        break;
      }
    }

    // console error and return if no available icon from elvis/assets-icons package
    if (newIcon === undefined) {
      console.error(`No icon found with the name ${icon}`);
      return `No icon found with name ${icon}`;
    }

    newIcon = getSize(newIcon, size, customSize);

    return newIcon;
  };

  const getSize = (icon: string, size: string, customSize?: string): string => {
    let definedSize;

    // find correct size according to size prop
    if (customSize === undefined) {
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
    }
    // override size with customSize if it is defined
    if (customSize !== undefined) {
      definedSize = customSize;
    }
    const wReg = /width="([^"]*)"/;
    const hReg = /height="([^"]*)"/;
    icon = icon.replace(wReg, `width="${definedSize}"`).replace(hReg, `height="${definedSize}"`);

    return icon;
  };

  const displayIcon = getIcon(name, size, color, customSize);

  return (
    <div style={inlineStyle} className={className ? className : ''}>
      <i dangerouslySetInnerHTML={{ __html: displayIcon }} aria-hidden="true" />{' '}
    </div>
  );
};

export default Icon;
