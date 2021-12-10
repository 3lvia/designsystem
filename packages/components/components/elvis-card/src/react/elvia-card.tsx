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
  CardDetailHoverArrow,
  CardMarker,
} from './styledComponents';

const globalMinWidth = 112;
const globalMaxWidth = 400;

export interface CardProps {
  icon?: string;
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
  webcomponent: any;
}

const colors = {
  elviaBlack: getColor('black'),
};

const Card: FC<CardProps> = ({
  header,
  description,
  icon,
  borderColor,
  type = 'simple',
  shape = 'square',
  isInverted,
  width = '100%',
  minWidth,
  maxWidth,
  maxDescriptionLines = 5,
  label,
  webcomponent,
}) => {
  if (type === 'detail') shape = 'square';

  minWidth = minWidth ? Math.max(minWidth, globalMinWidth) : globalMinWidth;
  maxWidth = maxWidth ? Math.min(maxWidth, globalMaxWidth) : globalMaxWidth;

  const cardIcon = useRef<HTMLDivElement>(null);
  const cardMarker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    // Get slotted items from web component
    if (cardIcon.current && webcomponent.getSlot('icon')) {
      cardIcon.current.innerHTML = '';
      cardIcon.current.appendChild(webcomponent.getSlot('icon'));
    }
    if (cardMarker.current && webcomponent.getSlot('marker')) {
      cardMarker.current.innerHTML = '';
      cardMarker.current.appendChild(webcomponent.getSlot('marker'));
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
        {icon && <CardIcon data-testid="card-icon">{icon}</CardIcon>}
        {!icon && (
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
          <CardLabel data-testid="card-detail-label">
            <label className="e-label">{label}</label>
          </CardLabel>
        )}
      </CardContent>
      {type === 'detail' && (
        <CardDetailHoverArrow data-testid="card-detail-hover-arrow">
          <i dangerouslySetInnerHTML={{ __html: arrowLongRight.getIcon(colors.elviaBlack) }}></i>
        </CardDetailHoverArrow>
      )}
      <CardMarker data-testid="card-marker">
        <div ref={cardMarker}></div>
      </CardMarker>
    </CardArea>
  );
};

export default Card;
