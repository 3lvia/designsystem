import React, { FC } from 'react';
type IconSizes =
  | 'xxs'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'xxl'
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {});

export interface IconWrapperProps {
  icon: string;
  size?: IconSizes;
}

/**
 * Use this wrapper to render icons from `@elvia/elvis-assets-icons` as React components.
 * @example
 * import { expandCircleColor } from '@elvia/elvis-assets-icons';
 * ...
 * export const Component: FC<Props> = ({content, webcomponent}) => {
 *  ...
 *  return (<IconWrapper icon={expandCircleColor.getIcon()} size="md" />)
 * }
 * @since 7.3.0
 */
export const IconWrapper: FC<IconWrapperProps> = ({ icon, size = 'sm' }) => {
  const getIconSize = (): string => {
    switch (size) {
      case 'xxs':
        return '8px';
      case 'xs':
        return '16px';
      case 'sm':
        return '24px';
      case 'md':
        return '32px';
      case 'lg':
        return '40px';
      case 'xl':
        return '48px';
      case 'xxl':
        return '56px';
      default:
        return size;
    }
  };
  const getIconWithSize = (): string => {
    const newSize = getIconSize();
    return icon
      .replace(/width="([^"]*)"/, `width="${newSize}"`)
      .replace(/height="([^"]*)"/, `height="${newSize}"`);
  };

  return (
    <i
      dangerouslySetInnerHTML={{ __html: getIconWithSize() }}
      style={{ display: 'flex' }}
      aria-hidden="true"
    />
  );
};
