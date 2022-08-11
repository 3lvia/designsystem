import React, { FC, useRef, useEffect, useState, CSSProperties } from 'react';
import { Icon } from '@elvia/elvis-icon/react';
import { CardType, CardShape, BorderColor } from './elvia-card.types';
import {
  CardArea,
  CardContent,
  CardHeader,
  CardDescription,
  CardIcon,
  CardColoredLine,
  CardLabel,
  CardLabelContainer,
  CardHoverArrow,
  CardCornerIcon,
} from './styledComponents';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';

const globalMinWidthSimple = 112;
const globalMinWidthDetail = 250;
const globalMaxWidth = 400;

export interface CardProps {
  icon: string | JSX.Element;
  iconHover?: string | JSX.Element;
  header?: string;
  description?: string;
  borderColor?: BorderColor;
  type?: CardType;
  shape?: CardShape;
  hasBorder?: boolean;
  width?: string;
  minWidth?: number;
  maxWidth?: number;
  maxDescriptionLines?: number;
  label?: string;
  cornerIcon?: string | JSX.Element;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}

const Card: FC<CardProps> = ({
  icon,
  iconHover,
  header,
  description,
  borderColor,
  type = 'simple',
  shape = 'square',
  hasBorder = true,
  width = '100%',
  minWidth,
  maxWidth,
  maxDescriptionLines = 5,
  label,
  cornerIcon,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  if (type === 'detail') shape = 'square';
  if (type === 'simple') maxDescriptionLines = 1;

  if (type === 'simple') {
    minWidth = minWidth ? Math.max(minWidth, globalMinWidthSimple) : globalMinWidthSimple;
  } else {
    minWidth = minWidth ? Math.max(minWidth, globalMinWidthDetail) : globalMinWidthDetail;
  }
  maxWidth = maxWidth ? Math.min(maxWidth, globalMaxWidth) : globalMaxWidth;

  const iconRef = useRef<HTMLDivElement>(null);
  const cornerIconRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);

  /** Get all slots and place them correctly */
  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    if (iconRef.current && webcomponent.getSlot('icon')) {
      iconRef.current.innerHTML = '';
      iconRef.current.appendChild(webcomponent.getSlot('icon'));
    }
    if (cornerIconRef.current && webcomponent.getSlot('cornerIcon')) {
      cornerIconRef.current.innerHTML = '';
      cornerIconRef.current.appendChild(webcomponent.getSlot('cornerIcon'));
    }
  }, [webcomponent]);

  /** Change icon on hover if iconHover slot is used */
  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    if (isHovering && iconRef.current && webcomponent.getSlot('iconHover')) {
      iconRef.current.innerHTML = '';
      iconRef.current.appendChild(webcomponent.getSlot('iconHover'));
    } else if (!isHovering && iconRef.current && webcomponent.getSlot('icon')) {
      iconRef.current.innerHTML = '';
      iconRef.current.appendChild(webcomponent.getSlot('icon'));
    }
  }, [isHovering, webcomponent]);

  return (
    <CardArea
      type={type}
      shape={shape}
      hasBorder={hasBorder}
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
      label={label}
      data-testid="card-area"
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
      className={className ?? ''}
      style={inlineStyle}
      {...rest}
    >
      {shape === 'square' && type === 'simple' && borderColor && (
        <CardColoredLine borderColor={borderColor} data-testid="card-colored-line"></CardColoredLine>
      )}
      <CardContent shape={shape} data-testid="card-content">
        {icon && type === 'simple' && (
          <CardIcon data-testid="card-icon">{isHovering && iconHover ? iconHover : icon}</CardIcon>
        )}
        {!icon && type === 'simple' && (
          <CardIcon data-testid="card-icon">
            <div ref={iconRef}></div>
          </CardIcon>
        )}
        {header && (
          <CardHeader shape={shape} type={type} data-testid="card-header">
            {header}
          </CardHeader>
        )}
        {description && (
          <CardDescription
            shape={shape}
            type={type}
            maxDescriptionLines={maxDescriptionLines}
            data-testid="card-description"
          >
            {description}
          </CardDescription>
        )}
        {type === 'detail' && label && (
          <CardLabelContainer data-testid="card-label-container">
            <CardLabel data-testid="card-label">{label}</CardLabel>
          </CardLabelContainer>
        )}
      </CardContent>
      {type === 'detail' && (
        <CardHoverArrow data-testid="card-detail-hover-arrow">
          <Icon name="arrowLongRight" />
        </CardHoverArrow>
      )}
      {type === 'detail' && cornerIcon && (
        <CardCornerIcon data-testid="card-corner-icon">{cornerIcon}</CardCornerIcon>
      )}
      {type === 'detail' && !cornerIcon && (
        <CardCornerIcon data-testid="card-corner-icon">
          <div ref={cornerIconRef}></div>
        </CardCornerIcon>
      )}
    </CardArea>
  );
};

export default Card;
