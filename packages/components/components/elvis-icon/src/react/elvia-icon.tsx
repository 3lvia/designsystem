import React from 'react';
import * as elvisIcons from '@elvia/elvis-assets-icons';
import './style.scss';

export type IconSizes = 'sm' | 'md' | 'lg';

interface IconProps {
  iconName?: elvisIcons.IconName;
  iconColor?: string;
  // iconSize: IconSizes;
  // iconCustomSize?: number;
}

export const ElvisIcon: React.FC<IconProps> = ({
  iconName,
  iconColor,
}) => {


  if (iconName == undefined) return null
  const namePlaceholder: string = iconName

  const icon = elvisIcons[namePlaceholder]?.getIcon(iconColor)

  if (icon == undefined) {
    return null
  }


  return <i dangerouslySetInnerHTML={{ __html: icon }}></i>
};

export default ElvisIcon;
