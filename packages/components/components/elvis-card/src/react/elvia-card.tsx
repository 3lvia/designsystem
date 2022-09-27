import React, { FC, useRef, useEffect, useState, CSSProperties } from 'react';
import { Icon } from '@elvia/elvis-icon/react';
import { CardType, BorderColor } from './elvia-card.types';
import {
  CardArea,
  CardContent,
  CardHeading,
  CardDescription,
  CardIcon,
  CardColoredLine,
  CardTag,
  CardHoverArrow,
  CardCornerIcon,
  CardColoredLineContainer,
  CardHeadingContainer,
} from './styledComponents';
import { warnDeprecatedProps, useIsOverflowing } from '@elvia/elvis-toolbox';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { Tooltip } from '@elvia/elvis-tooltip/react';
import { cardConfig } from './config';

export interface CardProps {
  icon?: string | JSX.Element;
  iconHover?: string | JSX.Element;
  /**
   * @deprecated Deprecated in version 2.0.0. Use `heading` instead.
   */
  header?: never;
  heading?: string;
  description?: string;
  borderColor?: BorderColor;
  type?: CardType;
  /**
   * @deprecated Decrecated in version 2.0.0. Card no longer supports circle type.
   */
  shape?: never;
  hasBorder?: boolean;
  width?: string;
  height?: string;
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

const Card: FC<CardProps> = function ({
  icon,
  iconHover,
  heading,
  description,
  borderColor,
  type = 'simple',
  hasBorder = true,
  width = '100%',
  height = '100%',
  minWidth,
  maxWidth,
  maxDescriptionLines = 3,
  tag,
  cornerIcon,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  // eslint-disable-next-line prefer-rest-params
  warnDeprecatedProps(cardConfig, arguments[0]);

  const [isHoveringArea, setIsHoveringArea] = useState(false);
  const [isShowingHoverIcon, setIsShowingHoverIcon] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const iconRef = useRef<HTMLDivElement>(null);
  const cornerIconRef = useRef<HTMLDivElement>(null);

  const {
    isOverflowing: { vertical: headingIsOverflowing },
    ref: headingRef,
  } = useIsOverflowing<HTMLDivElement>();

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
  }, [webcomponent, type]);

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
      if (isHoveringArea) {
        setIsShowingHoverIcon(true);
      } else {
        setIsShowingHoverIcon(false);
      }
    }
  }, [isHoveringArea, isAnimating]);
  useEffect(() => {
    setIsAnimating(true);
  }, [isHoveringArea]);

  return (
    <CardArea
      type={type}
      hasBorder={hasBorder}
      width={width}
      height={height}
      minWidth={minWidth}
      maxWidth={maxWidth}
      data-testid="card-area"
      onPointerEnter={() => setIsHoveringArea(true)}
      onPointerLeave={() => setIsHoveringArea(false)}
      className={className ?? ''}
      style={inlineStyle}
      {...rest}
    >
      {type === 'simple' && borderColor && (
        <CardColoredLineContainer hasBorder={hasBorder}>
          <CardColoredLine borderColor={borderColor} data-testid="card-colored-line"></CardColoredLine>
        </CardColoredLineContainer>
      )}
      <CardContent type={type} data-testid="card-content">
        {type === 'simple' && (
          <CardIcon
            onTransitionEnd={() => setIsAnimating(false)}
            data-testid="card-icon"
            ref={iconRef ?? undefined}
          >
            {isShowingHoverIcon && iconHover ? iconHover : icon}
          </CardIcon>
        )}
        {heading && (
          <CardHeadingContainer>
            <Tooltip
              trigger={
                <CardHeading ref={headingRef} type={type} data-testid="card-heading">
                  {heading}
                </CardHeading>
              }
              content={heading}
              isDisabled={!headingIsOverflowing}
            ></Tooltip>
          </CardHeadingContainer>
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
        {type === 'detail' && tag && <CardTag data-testid="card-tag">{tag}</CardTag>}
      </CardContent>
      {type === 'detail' && (
        <CardHoverArrow data-testid="card-detail-hover-arrow">
          <Icon name="arrowLongRight" />
        </CardHoverArrow>
      )}
      {type === 'detail' && (cornerIcon || cornerIconRef) && (
        <CardCornerIcon hasBorder={hasBorder} ref={cornerIconRef ?? undefined} data-testid="card-corner-icon">
          {cornerIcon}
        </CardCornerIcon>
      )}
    </CardArea>
  );
};

export default Card;
