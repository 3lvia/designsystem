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

const globalMinWidthSimple = 112;
const globalMinWidthDetail = 250;
const globalMaxWidth = 400;

export interface CardProps {
  icon: string | HTMLElement;
  iconHover?: string | HTMLElement;
  header: string;
  description?: string;
  borderColor?: BorderColor;
  type: CardType;
  shape: CardShape;
  hasBorder: boolean;
  width: string;
  minWidth?: number;
  maxWidth?: number;
  maxDescriptionLines: number;
  label?: string;
  cornerIcon?: string | HTMLElement;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  webcomponent: any;
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
}) => {
  if (type === 'detail') shape = 'square';
  if (type === 'simple') maxDescriptionLines = 1;

  if (type === 'simple') {
    minWidth = minWidth ? Math.max(minWidth, globalMinWidthSimple) : globalMinWidthSimple;
  } else {
    minWidth = minWidth ? Math.max(minWidth, globalMinWidthDetail) : globalMinWidthDetail;
  }
  maxWidth = maxWidth ? Math.min(maxWidth, globalMaxWidth) : globalMaxWidth;

  const cardIcon = useRef<HTMLDivElement>(null);
  const currentCardIcon = cardIcon;
  const cardIconHover = useRef<HTMLDivElement>(null);
  const cardCornerIcon = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    // Get slotted items from web component
    if (cardIcon.current && webcomponent.getSlot('icon')) {
      cardIcon.current.innerHTML = '';
      cardIcon.current.appendChild(webcomponent.getSlot('icon'));
    }
    if (cardIconHover.current && webcomponent.getSlot('iconHover')) {
      cardIconHover.current.innerHTML = '';
      cardIconHover.current.appendChild(webcomponent.getSlot('iconHover'));
    }
    if (cardCornerIcon.current && webcomponent.getSlot('cornerIcon')) {
      cardCornerIcon.current.innerHTML = '';
      cardCornerIcon.current.appendChild(webcomponent.getSlot('cornerIcon'));
    }
  }, [webcomponent]);

  // Change icon on hover if iconHover slot is used
  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    if (isHovering && currentCardIcon.current && webcomponent.getSlot('iconHover')) {
      currentCardIcon.current.innerHTML = '';
      currentCardIcon.current.appendChild(webcomponent.getSlot('iconHover'));
    } else if (!isHovering && currentCardIcon.current && webcomponent.getSlot('icon')) {
      currentCardIcon.current.innerHTML = '';
      currentCardIcon.current.appendChild(webcomponent.getSlot('icon'));
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
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`${className ? className : ''}`}
      style={inlineStyle}
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
            <div ref={currentCardIcon}></div>
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
          <div ref={cardCornerIcon}></div>
        </CardCornerIcon>
      )}
    </CardArea>
  );
};

export default Card;
