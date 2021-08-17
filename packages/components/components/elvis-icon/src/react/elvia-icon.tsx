import React from 'react';
import * as elvisIcons from '@elvia/elvis-assets-icons';
import './style.scss';

export type IconSizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type iconDisplay = 'inline' | 'block';

interface IconProps {
  iconName?: elvisIcons.IconName;
  iconColor?: string;
  iconSize?: IconSizes;
  customSize?: number;
  iconDisplay: iconDisplay;
}

export const ElvisIcon: React.FC<IconProps> = ({
  iconName,
  iconColor,
  iconSize,
  customSize,
  iconDisplay = 'inline'
}) => {
  // basefont set to match main typography option for long and short text i Elvia applications. 
  const baseFontSize = 16;

  const getIconInEm = (Icon: string, iconSize: string | undefined) => {
    const wReg = /width="([^"]*)"/
    const hReg = /height="([^"]*)"/
    const width = wReg.exec(Icon)
    const height = hReg.exec(Icon)
    const w = width ? Number(width[1]) : 24
    const h = height ? Number(height[1]) : 24
    const wEm = `${w / baseFontSize}em`
    const hEm = `${h / baseFontSize}em`

    let definedSize;
    let NewIcon = Icon.replace(wReg, `width="${w / baseFontSize}em"`).replace(
      hReg,
      `height="${h / baseFontSize}em"`
    )

    if (iconSize !== undefined) {
      switch (iconSize) {
        case 'xxs':
          definedSize = '8px'
          break;
        case 'xs':
          definedSize = '16px'
          break;
        case 'sm':
          definedSize = '24px'
          break;
        case 'md':
          definedSize = '32px'
          break;
        case 'lg':
          definedSize = '40px'
          break;
        case 'xl':
          definedSize = '48px'
          break;
        case 'xxl':
          definedSize = '56px'
          break;
        default:
          definedSize = '24px'
          break;
      }
      NewIcon = Icon.replace(wReg, `width="${definedSize}"`).replace(
        hReg,
        `height="${definedSize}"`
      )
    }

    return { Icon: NewIcon, emHeight: hEm, emWidth: wEm }
  }

  const fontSizeInRemFromPx = (fontSize: number) =>
    `${fontSize / baseFontSize / 1.5}rem`

  if (iconName == undefined) return null
  const namePlaceholder: string = iconName

  const icon = elvisIcons[namePlaceholder]?.getIcon(iconColor)

  if (icon == undefined) {
    return null
  }

  const EmIcon = getIconInEm(icon, iconSize)
  const fontSizeInRem = customSize ? fontSizeInRemFromPx(customSize) : 'inherit'

  return (
    <span
      style={{
        display: iconDisplay,
        fontSize: fontSizeInRem,
      }}
      dangerouslySetInnerHTML={{ __html: EmIcon.Icon }}
    />
  )
};

export default ElvisIcon;
