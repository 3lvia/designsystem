import arrowLongRightBold from '@elvia/elvis-assets-icons/dist/icons/arrowLongRightBold';
import { IconWrapper, useIsOverflowing } from '@elvia/elvis-toolbox';
import { Tooltip } from '@elvia/elvis-tooltip/react';
import React, { FC, useEffect, useRef, useState } from 'react';

import { CardProps } from './elvia-card.types';
import {
  CardArea,
  CardColoredLine,
  CardColoredLineContainer,
  CardContent,
  CardCornerIcon,
  CardDescription,
  CardHeading,
  CardHoverArrow,
  CardIcon,
  CardTag,
} from './styledComponents';

export const Card: FC<CardProps> = function ({
  icon,
  iconHover,
  heading,
  headingLevel = 'h3',
  description,
  borderColor = 'none',
  type = 'simple',
  width = '100%',
  height,
  minWidth,
  maxWidth,
  maxDescriptionLines = 3,
  maxHeadingLines,
  tag,
  cornerIcon,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
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
      width={width}
      height={height}
      minWidth={minWidth}
      maxWidth={maxWidth}
      onPointerEnter={() => setIsHoveringArea(true)}
      onPointerLeave={() => setIsHoveringArea(false)}
      className={className ?? ''}
      style={inlineStyle}
      {...rest}
    >
      {type === 'simple' && !!borderColor && (
        <CardColoredLineContainer>
          <CardColoredLine borderColor={borderColor} data-testid="card-colored-line"></CardColoredLine>
        </CardColoredLineContainer>
      )}
      <CardContent type={type} data-testid="card-content">
        {type === 'simple' && (
          <CardIcon onTransitionEnd={() => setIsAnimating(false)} data-testid="card-icon" ref={iconRef}>
            {isShowingHoverIcon && iconHover ? iconHover : icon}
          </CardIcon>
        )}
        {!!heading && (
          <Tooltip
            trigger={
              <header>
                <CardHeading as={headingLevel} ref={headingRef} type={type} maxHeadingLines={maxHeadingLines}>
                  {heading}
                </CardHeading>
              </header>
            }
            content={heading}
            isDisabled={!headingIsOverflowing}
          />
        )}
        {!!description && (
          <CardDescription type={type} maxDescriptionLines={type === 'simple' ? 1 : maxDescriptionLines}>
            {description}
          </CardDescription>
        )}
        {type === 'detail' && tag && <CardTag data-testid="card-tag">{tag}</CardTag>}
      </CardContent>
      {type === 'detail' && (
        <CardHoverArrow data-testid="card-detail-hover-arrow">
          <IconWrapper icon={arrowLongRightBold} />
        </CardHoverArrow>
      )}
      {type === 'detail' && (!!cornerIcon || !!cornerIconRef) && (
        <CardCornerIcon ref={cornerIconRef} data-testid="card-corner-icon">
          {cornerIcon}
        </CardCornerIcon>
      )}
    </CardArea>
  );
};
