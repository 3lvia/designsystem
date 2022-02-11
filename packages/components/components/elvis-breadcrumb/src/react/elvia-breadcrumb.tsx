import React, { useState, useEffect, CSSProperties } from 'react';
import {
  BreadcrumbWrapper,
  BreadcrumbDesktopWrapper,
  BreadcrumbLink,
  // BreadcrumbIconRight,
  // BreadcrumbIconLeft,
} from './styledComponents';
import { Icon } from '@elvia/elvis-icon/react';

interface BreadcrumbLink {
  url?: string;
  title: string;
}

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbLink[];
  breadcrumbsOnChange?: (value: number) => void;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  webcomponent: any;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  breadcrumbs = [],
  breadcrumbsOnChange,
  className,
  inlineStyle,
  webcomponent,
}) => {
  const [childrenLength, setChildrenLength] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    setChildrenLength(breadcrumbs.length);
  }, [breadcrumbs]);

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
    if (!webcomponent && breadcrumbsOnChange) {
      breadcrumbsOnChange(value);
    } else if (webcomponent) {
      webcomponent.setProps({ breadcrumbs: value }, true);
    }
  };

  if (childrenLength === 0) {
    return null;
  }

  const MobileBreadcrumb = () => {
    return (
      <BreadcrumbWrapper>
        {/* <BreadcrumbIconLeft /> */}
        <Icon
          name="arrowLeftBold"
          size="xxs"
          inlineStyle={{
            marginRight: '8px',
          }}
        />
        <BreadcrumbLink
          key={undefined}
          href={breadcrumbs[childrenLength - 2].url}
          onClick={() => {
            handleOnClick(childrenLength - 2);
          }}
          isClickable={true}
        >
          {breadcrumbs[childrenLength - 2].title}
        </BreadcrumbLink>
      </BreadcrumbWrapper>
    );
  };

  const DesktopBreadcrumb = () => {
    const desktopBreadcrumbs = breadcrumbs.map((breadcrumb, index) => {
      if (index == childrenLength - 1) {
        return (
          <BreadcrumbLink
            href={breadcrumb.url}
            onClick={() => {
              handleOnClick(index);
            }}
            key={index}
            isClickable={false}
            data-testid="breadcrumb-desktop-last-link"
            aria-current="location"
          >
            {breadcrumb.title}
          </BreadcrumbLink>
        );
      }
      return (
        <BreadcrumbDesktopWrapper key={index}>
          <BreadcrumbLink
            href={breadcrumb.url}
            onClick={() => {
              handleOnClick(index);
            }}
            key={undefined}
            isClickable={true}
            data-testid="breadcrumb-desktop-multiple-links"
          >
            {breadcrumb.title}
          </BreadcrumbLink>
          {/* <BreadcrumbIconRight /> */}
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

    return desktopBreadcrumbs;
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
    >
      {breadcrumb}
    </BreadcrumbWrapper>
  );
};

export default Breadcrumb;
