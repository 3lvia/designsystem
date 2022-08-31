import React, { FC, useRef, useEffect, useState, CSSProperties } from 'react';
import { Icon } from '@elvia/elvis-icon/react';
import { CardType, BorderColor } from './elvia-card.types';
import {
  CardArea,
  CardContent,
  CardHeader,
  CardDescription,
  CardIcon,
  CardColoredLine,
  CardTag,
  CardHoverArrow,
  CardCornerIcon,
} from './styledComponents';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';

export interface CardProps {
  icon?: string | JSX.Element;
  iconHover?: string | JSX.Element;
  header?: string;
  description?: string;
  borderColor?: BorderColor;
  type?: CardType;
  /**
   * @deprecated Decrecated in version 2.0.0. Card no longer supports circle type.
   */
  shape?: never;
  hasBorder?: boolean;
  width?: string;
  minWidth?: number;
  maxWidth?: number;
  maxDescriptionLines?: number;
  /**
   * @deprecated Decrecated in version 2.0.0. Instead use `tag`.
   */
  label?: never;
  tag?: string;
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
  hasBorder = true,
  width = '100%',
  minWidth,
  maxWidth,
  maxDescriptionLines = 3,
  tag,
  cornerIcon,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isShowingHoverIcon, setIsShowingHoverIcon] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const iconRef = useRef<HTMLDivElement>(null);
  const cornerIconRef = useRef<HTMLDivElement>(null);

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
    if (isShowingHoverIcon && iconRef.current && webcomponent.getSlot('iconHover')) {
      iconRef.current.innerHTML = '';
      iconRef.current.appendChild(webcomponent.getSlot('iconHover'));
    } else if (!isShowingHoverIcon && iconRef.current && webcomponent.getSlot('icon')) {
      iconRef.current.innerHTML = '';
      iconRef.current.appendChild(webcomponent.getSlot('icon'));
    }
  }, [isShowingHoverIcon, webcomponent]);

  /** Handle setting hover icon when animation is done */
  useEffect(() => {
    if (isAnimating) {
      setIsShowingHoverIcon(false);
    } else {
      if (isHovering) {
        setIsShowingHoverIcon(true);
      } else {
        setIsShowingHoverIcon(false);
      }
    }
  }, [isHovering, isAnimating]);
  useEffect(() => {
    setIsAnimating(true);
  }, [isHovering]);

  return (
    <CardArea
      type={type}
      hasBorder={hasBorder}
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
      data-testid="card-area"
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
      className={className ?? ''}
      style={inlineStyle}
      {...rest}
    >
      {type === 'simple' && borderColor && (
        <CardColoredLine borderColor={borderColor} data-testid="card-colored-line"></CardColoredLine>
      )}
      <CardContent type={type} data-testid="card-content">
        {type === 'simple' && (
          <CardIcon onTransitionEnd={() => setIsAnimating(false)} data-testid="card-icon">
            {!icon ? <div ref={iconRef} /> : isShowingHoverIcon && iconHover ? iconHover : icon}
          </CardIcon>
        )}
        {header && (
          <CardHeader type={type} data-testid="card-header">
            {header}
          </CardHeader>
        )}
        {description && (
          <CardDescription
            type={type}
            maxDescriptionLines={type === 'simple' ? 1 : maxDescriptionLines}
            data-testid="card-description"
          >
            {description}
          </CardDescription>
        )}
      </CardContent>
      {type === 'detail' && tag && <CardTag data-testid="card-tag">{tag}</CardTag>}
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
