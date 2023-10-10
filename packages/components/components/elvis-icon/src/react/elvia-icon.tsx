import React, { CSSProperties, ComponentPropsWithoutRef } from 'react';
import * as elvisIcons from '@elvia/elvis-assets-icons';
import { IconName } from '@elvia/elvis-assets-icons';
export type { IconName } from '@elvia/elvis-assets-icons';
export type IconSizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface BaseIconProps {
  name: IconName;
  color?: Parameters<(typeof elvisIcons)[keyof typeof elvisIcons]['getIcon']>[0];
  size?: IconSizes;
  customSize?: string;
  className?: string;
  inlineStyle?: CSSProperties;
  children?: React.ReactNode;
}

export interface IconProps extends BaseIconProps, Omit<ComponentPropsWithoutRef<'i'>, 'color'> {}

export const Icon: React.FC<IconProps> = ({
  name,
  color,
  size = 'sm',
  customSize,
  className,
  inlineStyle,
  ...rest
}) => {
  const getIcon = (icon: IconProps['name'], size: IconSizes, color?: string, customSize?: string): string => {
    try {
      const newIcon = elvisIcons[icon as keyof typeof elvisIcons].getIcon(color);
      return getSize(newIcon, size, customSize);
    } catch (error) {
      const errorMessage = `No icon found with the name ${icon}${color ? ` and color ${color}` : ''}`;
      console.error(errorMessage);
      return errorMessage;
    }
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

  // Remove children from rest because dangerouslySetInnerHTML is used
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, ...restWithoutChildren } = rest;

  return (
    <i
      dangerouslySetInnerHTML={{ __html: displayIcon }}
      aria-hidden="true"
      style={{ display: 'flex', ...inlineStyle }}
      className={className ? className : ''}
      {...restWithoutChildren}
    />
  );
};

export default Icon;
