import React, { CSSProperties, useEffect, useState } from 'react';
import type { ElviaColor } from '@elvia/elvis-colors';
import { IconName } from '@elvia/elvis-assets-icons';
export type { IconName } from '@elvia/elvis-assets-icons';
export type IconSizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface IconProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  name: IconName;
  color?: ElviaColor | 'inverted';
  size?: IconSizes;
  customSize?: string;
  className?: string;
  inlineStyle?: CSSProperties;
}
export const Icon: React.FC<IconProps> = ({
  name,
  color,
  size = 'sm',
  customSize,
  className,
  inlineStyle,
  ...rest
}) => {
  const [displayIcon, setDisplayIcon] = useState('');

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
    return icon.replace(wReg, `width="${definedSize}"`).replace(hReg, `height="${definedSize}"`);
  };

  // Must use useEffect to support async function
  useEffect(() => {
    // Use abort controller to avoid updating any states after the component is unmounted
    const abortController = new AbortController();

    const getIcon = async (
      iconName: IconProps['name'],
      size: IconSizes,
      color?: ElviaColor,
      customSize?: string,
    ): Promise<string> => {
      return import('@elvia/elvis-assets-icons')
        .then((elvisAssetsIcons) => elvisAssetsIcons[iconName].getIcon(color))
        .then((newIcon) => getSize(newIcon, size, customSize))
        .catch(() => {
          const errorMessage = `No icon found with the name ${iconName}${color ? ` and color ${color}` : ''}`;
          console.error(errorMessage);
          return errorMessage;
        });
    };

    const updateIcon = async () => {
      getIcon(name, size, color, customSize).then((newIcon) => {
        if (!abortController.signal.aborted) {
          setDisplayIcon(newIcon);
        }
      });
    };
    updateIcon();

    return () => {
      abortController.abort();
    };
  }, [name, color, size, customSize]);

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
