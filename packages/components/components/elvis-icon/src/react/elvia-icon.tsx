import React from 'react';
import * as elvisIcons from '@elvia/elvis-assets-icons';
import './style.scss';

export type IconSizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type iconDisplay = 'inline' | 'block';
export type fontSizeType = 'px' | 'em' | 'rem';

interface IconProps {
  iconName?: elvisIcons.IconName;
  iconColor?: string;
  iconSize?: IconSizes;
  customSize?: number;
  iconDisplay: iconDisplay;
  fontSizeType: fontSizeType;
  baseFontSize: number;
}

export const ElvisIcon: React.FC<IconProps> = ({
  iconName,
  iconColor,
  iconSize,
  customSize = undefined,
  iconDisplay = 'inline',
  fontSizeType = 'px',
  baseFontSize = 16
}) => {

  // basefont set to match main typography option for long and short text i Elvia applications. 
  const appbaseFontSize = baseFontSize;

  const getIcon = (Icon: string, iconSize: string | undefined) => {
    // new icons placeholder
    let NewIcon = undefined;

    // regex to fint width & height properties of svg
    const wReg = /width="([^"]*)"/
    const hReg = /height="([^"]*)"/
    // inital width & height properties of svg
    const width = wReg.exec(Icon)
    const height = hReg.exec(Icon)

    const w = width ? Number(width[1]) : 24
    const h = height ? Number(height[1]) : 24

    // calculate icon size if fontSizeType is set to "em"    
    if (fontSizeType === "em") {
      const wEm = `${w / appbaseFontSize}em`
      const hEm = `${h / appbaseFontSize}em`

      NewIcon = Icon.replace(wReg, `width="${wEm}em"`).replace(
        hReg,
        `height="${hEm}em"`)
    }

    // calculate icon size if fontSizeType is set to "rem"    
    // TODO

    // calculate icon size if fontSizeType is set to "em"    
    let definedSize;
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


    // calculate icon size if custome size is set    
    // TODO




    // let NewIcon = Icon.replace(wReg, `width="${w / appbaseFontSize}em"`).replace(
    //   hReg,
    //   `height="${h / baseFontSize}em"`
    // )


    // let NewIcon = Icon.replace(wReg, `width="${w / appbaseFontSize}em"`).replace(
    //   hReg,
    //   `height="${h / baseFontSize}em"`
    // )

    if (NewIcon === undefined) {
      NewIcon = Icon;
    }

    return { Icon: NewIcon }
  }




  // const fontSizeInRemFromPx = (fontSize: number) =>
  //   `${fontSize / baseFontSize / 1.5}rem`







  // if no valid icon name is provided
  if (iconName == undefined) return null
  const namePlaceholder: string = iconName

  const icon = elvisIcons[namePlaceholder]?.getIcon(iconColor)

  if (icon == undefined) {
    return null
  }

  const EmIcon = getIcon(icon, iconSize)
  // const fontSizeInRem = customSize ? fontSizeInRemFromPx(customSize) : 'inherit'

  return (
    <i
      /// KEEP STYLE TAG FINT FONT SIZE, NECESARRY FOR EM/REM BASED ICON SIZING. 
      // style={{
      //   display: iconDisplay,
      //   fontSize: fontSizeInRem,
      // }}
      dangerouslySetInnerHTML={{ __html: EmIcon.Icon }}
    />
  )
};

export default ElvisIcon;
