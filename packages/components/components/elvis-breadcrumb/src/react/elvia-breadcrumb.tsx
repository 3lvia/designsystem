import React, { useState, useEffect, ComponentPropsWithoutRef } from 'react';
import {
  BreadcrumbWrapper,
  BreadcrumbDesktopWrapper,
  BreadcrumbLinkStyle,
  BreadcrumbListWrapper,
  BreadcrumbMobileWrapper,
} from './styledComponents';
import { warnDeprecatedProps, IconWrapper, BaseProps } from '@elvia/elvis-toolbox';
import arrowLeftBold from '@elvia/elvis-assets-icons/dist/icons/arrowLeftBold';
import arrowRightBold from '@elvia/elvis-assets-icons/dist/icons/arrowRightBold';
import { config } from './config';

interface BreadcrumbLink {
  /**
   * @deprecated Deprecated in version 2.0.0. Use href instead.
   */
  url?: string;
  /**
   * @deprecated Deprecated in version 2.0.0. Use text instead
   */
  title?: string;
  href?: string;
  text: string;
}

interface DeprecatedBreadcrumbProps {
  /**
   * @deprecated Deprecated in version 2.0.0. Use items instead.
   */
  breadcrumbs?: BreadcrumbLink[];
  /**
   * @deprecated Deprecated in version 2.0.0. Use onLinkClick instead.
   */
  breadcrumbsOnChange?: (value: number) => void;
}

export interface BreadcrumbProps
  extends ComponentPropsWithoutRef<'nav'>,
    BaseProps,
    DeprecatedBreadcrumbProps {
  items: BreadcrumbLink[];
  onLinkClick?: (value: number) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = function ({
  items = [],
  onLinkClick,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  warnDeprecatedProps(config, arguments[0]);

  const [childrenLength, setChildrenLength] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    setChildrenLength(items.length);
  }, [items]);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const getWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', getWindowDimensions);
    return () => {
      window.removeEventListener('resize', getWindowDimensions);
    };
  });

  const handleOnClick = (value: number) => {
    if (!webcomponent && onLinkClick) {
      onLinkClick(value);
    } else if (webcomponent) {
      webcomponent.triggerEvent('onLinkClick', value);
    }
  };

  if (childrenLength === 0) {
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
          href={items[childrenLength - 2].href}
          onClick={() => {
            handleOnClick(childrenLength - 2);
          }}
          $isClickable={true}
        >
          {items[childrenLength - 2].text}
        </BreadcrumbLinkStyle>
      </BreadcrumbWrapper>
    );
  };

  const DesktopBreadcrumb = () => {
    return items.map((item, index) => {
      if (index == childrenLength - 1) {
        return (
          <BreadcrumbDesktopWrapper key={index}>
            <BreadcrumbLinkStyle
              href={item.href}
              onClick={() => {
                handleOnClick(index);
              }}
              $isClickable={false}
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
            $isClickable={true}
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

export default Breadcrumb;
