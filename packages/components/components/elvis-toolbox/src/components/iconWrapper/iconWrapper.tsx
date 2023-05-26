import React, { useMemo } from 'react';
import { IconWrapperType } from './iconWrapper.types';

/**
 * Use this wrapper to render icons from `@elvia/elvis-assets-icons` as React components.
 * @example
 * import { expandCircleColor } from '@elvia/elvis-assets-icons';
 * ...
 * export const Component: FC<Props> = ({content, webcomponent}) => {
 *  ...
 *  return (<IconWrapper icon={expandCircleColor} size="md" />)
 * }
 * @since 7.4.0
 * @internal
 */
export const IconWrapper: IconWrapperType = ({ icon, color, size = 'sm', ...rest }) => {
  const transformedSize = useMemo(() => {
    switch (size) {
      case 'xxs':
        return '8px';
      case 'xs':
        return '16px';
      case 'sm':
      case 'small':
        return '24px';
      case 'md':
      case 'medium':
        return '32px';
      case 'lg':
      case 'large':
        return '40px';
      case 'xl':
        return '48px';
      case 'xxl':
        return '56px';
      default:
        return size;
    }
  }, [size]);

  const iconWithColor = useMemo(() => icon.getIcon(color), [icon, color]);
  const transformedIcon = useMemo(() => {
    return iconWithColor
      .replace(/width="([^"]*)"/, `width="${transformedSize}"`)
      .replace(/height="([^"]*)"/, `height="${transformedSize}"`);
  }, [iconWithColor, transformedSize]);

  return (
    <i
      dangerouslySetInnerHTML={{ __html: transformedIcon }}
      aria-hidden="true"
      {...rest}
      style={{ display: 'flex', ...rest.style }}
    />
  );
};
