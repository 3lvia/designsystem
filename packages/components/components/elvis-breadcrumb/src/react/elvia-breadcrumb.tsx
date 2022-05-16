import React, { useState, useEffect, CSSProperties } from 'react';
import {
  BreadcrumbWrapper,
  BreadcrumbDesktopWrapper,
  BreadcrumbLinkStyle,
  BreadcrumbListWrapper,
  BreadcrumbMobileWrapper,
} from './styledComponents';
import { Icon } from '@elvia/elvis-icon/react';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';
import { warnDeprecatedProps } from '@elvia/elvis-toolbox';
import { breadcrumbConfig, breadcrumbLinkConfig } from './config';

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

interface BreadcrumbProps {
  /**
   * @deprecated Deprecated in version 2.0.0. Use items instead.
   */
  breadcrumbs?: BreadcrumbLink[];
  items: BreadcrumbLink[];
  /**
   * @deprecated Deprecated in version 2.0.0. Use itemsOnChange instead.
   */
  breadcrumbsOnChange?: (value: number) => void;
  itemsOnChange: (value: number) => void;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  webcomponent?: ElvisComponentWrapper;
}

const Breadcrumb: React.FC<BreadcrumbProps> = function ({
  items = [],
  itemsOnChange,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  // eslint-disable-next-line prefer-rest-params
  warnDeprecatedProps(breadcrumbConfig, arguments[0]);
  items.forEach((item) => {
    warnDeprecatedProps(breadcrumbLinkConfig, item);
  });

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
    if (!webcomponent && itemsOnChange) {
      itemsOnChange(value);
    } else if (webcomponent) {
      webcomponent.setProps({ items: value }, true);
    }
  };

  if (childrenLength === 0) {
    return null;
  }

  const MobileBreadcrumb = () => {
    return (
      <BreadcrumbWrapper>
        <Icon
          name="arrowLeftBold"
          size="xxs"
          inlineStyle={{
            marginRight: '8px',
          }}
        />
        <BreadcrumbLinkStyle
          href={items[childrenLength - 2].href}
          onClick={() => {
            handleOnClick(childrenLength - 2);
          }}
          isClickable={true}
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
          <Icon
            name="arrowRightBold"
            size="xxs"
            inlineStyle={{
              margin: '0px 8px',
            }}
          />
        </BreadcrumbDesktopWrapper>
      );
    });
  };
  let breadcrumb;
  if (windowWidth !== undefined) {
    breadcrumb = windowWidth < 768 ? MobileBreadcrumb() : DesktopBreadcrumb();
  } else {
    breadcrumb = DesktopBreadcrumb();
  }

  return (
    <BreadcrumbWrapper
      className={`${className ? className : ''}`}
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
