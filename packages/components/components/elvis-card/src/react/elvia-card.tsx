import React, { FC, useRef, useEffect } from 'react';
import { getColor } from '@elvia/elvis-colors';
import { arrowLongRight } from '@elvia/elvis-assets-icons';
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
  CardDetailHoverArrow,
  CardCornerIcon,
} from './styledComponents';

const globalMinWidth = 112;
const globalMaxWidth = 400;

export interface CardProps {
  icon: string | HTMLElement;
  iconHover?: string | HTMLElement;
  header: string;
  description?: string;
  borderColor?: BorderColor;
  type: CardType;
  shape: CardShape;
  isInverted: boolean;
  width: string;
  minWidth?: number;
  maxWidth?: number;
  maxDescriptionLines: number;
  label?: string;
  cornerIcon?: string | HTMLElement;
  webcomponent: any;
}

const colors = {
  elviaBlack: getColor('black'),
};

const Card: FC<CardProps> = ({
  icon,
  iconHover,
  header,
  description,
  borderColor,
  type = 'simple',
  shape = 'square',
  isInverted,
  width = '100%',
  minWidth,
  maxWidth,
  maxDescriptionLines = 5,
  label,
  cornerIcon,
  webcomponent,
}) => {
  if (type === 'detail') shape = 'square';
  if (type === 'simple') maxDescriptionLines = 1;

  minWidth = minWidth ? Math.max(minWidth, globalMinWidth) : globalMinWidth;
  maxWidth = maxWidth ? Math.min(maxWidth, globalMaxWidth) : globalMaxWidth;

  const cardIcon = useRef<HTMLDivElement>(null);
  const cardIconHover = useRef<HTMLDivElement>(null);
  const cardCornerIcon = useRef<HTMLDivElement>(null);

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

  return (
    <CardArea
      type={type}
      shape={shape}
      isInverted={isInverted}
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
      label={label}
      data-testid="card-area"
    >
      {shape === 'square' && type === 'simple' && (
        <CardColoredLine borderColor={borderColor} data-testid="card-colored-line"></CardColoredLine>
      )}
      <CardContent shape={shape} data-testid="card-content">
        {icon && type === 'simple' && <CardIcon data-testid="card-icon">{icon}</CardIcon>}
        {!icon && type === 'simple' && (
          <CardIcon data-testid="card-icon">
            <div ref={cardIcon}></div>
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
          <CardLabelContainer data-testid="card-detail-label">
            <CardLabel>{label}</CardLabel>
          </CardLabelContainer>
        )}
      </CardContent>
      {type === 'detail' && (
        <CardDetailHoverArrow data-testid="card-detail-hover-arrow">
          <i dangerouslySetInnerHTML={{ __html: arrowLongRight.getIcon(colors.elviaBlack) }}></i>
        </CardDetailHoverArrow>
      )}
      {cornerIcon && <CardCornerIcon data-testid="card-corner-icon">{cornerIcon}</CardCornerIcon>}
      {!cornerIcon && (
        <CardCornerIcon data-testid="card-corner-icon">
          <div ref={cardCornerIcon}></div>
        </CardCornerIcon>
      )}
    </CardArea>
  );
};

export default Card;
