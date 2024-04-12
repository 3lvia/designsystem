import arrowLeftBold from '@elvia/elvis-assets-icons/dist/icons/arrowLeftBold';
import arrowRightBold from '@elvia/elvis-assets-icons/dist/icons/arrowRightBold';
import { IconWrapper, isSsr } from '@elvia/elvis-toolbox';
import React, { useEffect, useState } from 'react';

import { BreadcrumbProps } from './elvia-breadcrumb.types';
import {
  BreadcrumbDesktopWrapper,
  BreadcrumbLinkStyle,
  BreadcrumbListWrapper,
  BreadcrumbMobileWrapper,
  BreadcrumbWrapper,
} from './styledComponents';

export const Breadcrumb: React.FC<BreadcrumbProps> = function ({
  items = [],
  onLinkClick,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(isSsr() ? undefined : window.innerWidth);

  useEffect(() => {
    if (isSsr()) return;
    const getWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', getWindowDimensions);
    return () => {
      window.removeEventListener('resize', getWindowDimensions);
    };
  }, []);

  const handleOnClick = (value: number) => {
    if (!webcomponent && onLinkClick) {
      onLinkClick(value);
    } else if (webcomponent) {
      webcomponent.triggerEvent('onLinkClick', value);
    }
  };

  if (items.length === 0) {
    return null;
  }

  const MobileBreadcrumb = () => {
    return (
      <BreadcrumbWrapper>
        <IconWrapper
          icon={arrowLeftBold}
          size="xxs"
          style={{
            marginRight: '8px',
          }}
        />
        <BreadcrumbLinkStyle
          href={items[items.length - 2].href}
          onClick={() => {
            handleOnClick(items.length - 2);
          }}
          isClickable={true}
        >
          {items[items.length - 2].text}
        </BreadcrumbLinkStyle>
      </BreadcrumbWrapper>
    );
  };

  const DesktopBreadcrumb = () => {
    return items.map((item, index) => {
      if (index == items.length - 1) {
        return (
          <BreadcrumbDesktopWrapper key={index}>
            <BreadcrumbLinkStyle
              href={item.href}
              onClick={() => {
                handleOnClick(index);
              }}
              isClickable={false}
              data-testid="breadcrumb-desktop-last-link"
              aria-current="page"
            >
              {item.text}
            </BreadcrumbLinkStyle>
          </BreadcrumbDesktopWrapper>
        );
      }
      return (
        <BreadcrumbDesktopWrapper key={index}>
          <BreadcrumbLinkStyle
            href={item.href}
            onClick={() => {
              handleOnClick(index);
            }}
            isClickable={true}
            data-testid="breadcrumb-desktop-multiple-links"
          >
            {item.text}
          </BreadcrumbLinkStyle>
          <IconWrapper
            icon={arrowRightBold}
            size="xxs"
            style={{
              margin: '0px 8px',
            }}
          />
        </BreadcrumbDesktopWrapper>
      );
    });
  };
  const breadcrumb =
    windowWidth !== undefined && windowWidth < 768 ? MobileBreadcrumb() : DesktopBreadcrumb();

  return (
    <BreadcrumbWrapper
      className={className}
      style={inlineStyle}
      data-testid="breadcrumb-wrapper"
      aria-label="Breadcrumbs"
      {...rest}
    >
      <BreadcrumbListWrapper>
        {Array.isArray(breadcrumb) ? (
          breadcrumb
        ) : (
          <BreadcrumbMobileWrapper>{breadcrumb}</BreadcrumbMobileWrapper>
        )}
      </BreadcrumbListWrapper>
    </BreadcrumbWrapper>
  );
};
