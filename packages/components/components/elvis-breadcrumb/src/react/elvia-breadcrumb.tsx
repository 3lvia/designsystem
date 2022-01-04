import React, { useState, useEffect } from 'react';
import * as StyledBreadcrumb from './styledComponents';

interface BreadcrumbLink {
  url?: string;
  title: string;
}

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbLink[];
  breadcrumbsOnChange?: (value: number) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs = [], breadcrumbsOnChange }) => {
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

  if (childrenLength === 0) {
    return null;
  }

  const MobileBreadcrumb = () => {
    return (
      <StyledBreadcrumb.EWCBreadcrumbDesktopWrapper>
        <StyledBreadcrumb.EWCBreadcrumbIconLeft />
        <StyledBreadcrumb.EWCBreadcrumbLink
          key={undefined}
          href={breadcrumbs[childrenLength - 2].url}
          onClick={() => {
            breadcrumbsOnChange && breadcrumbsOnChange(childrenLength - 2);
          }}
          isClickable={true}
        >
          {breadcrumbs[childrenLength - 2].title}
        </StyledBreadcrumb.EWCBreadcrumbLink>
      </StyledBreadcrumb.EWCBreadcrumbDesktopWrapper>
    );
  };

  const DesktopBreadcrumb = () => {
    const desktopBreadcrumbs = breadcrumbs.map((breadcrumb, index) => {
      if (index == childrenLength - 1) {
        return (
          <StyledBreadcrumb.EWCBreadcrumbLink
            href={breadcrumb.url}
            onClick={() => {
              breadcrumbsOnChange && breadcrumbsOnChange(index);
            }}
            key={index}
            isClickable={false}
            data-testid="breadcrumb-desktop-last-link"
          >
            {breadcrumb.title}
          </StyledBreadcrumb.EWCBreadcrumbLink>
        );
      }
      return (
        <StyledBreadcrumb.EWCBreadcrumbDesktopWrapper key={index}>
          <StyledBreadcrumb.EWCBreadcrumbLink
            href={breadcrumb.url}
            onClick={() => {
              breadcrumbsOnChange && breadcrumbsOnChange(index);
            }}
            key={undefined}
            isClickable={true}
            data-testid="breadcrumb-desktop-multiple-links"
          >
            {breadcrumb.title}
          </StyledBreadcrumb.EWCBreadcrumbLink>
          <StyledBreadcrumb.EWCBreadcrumbIconRight />
        </StyledBreadcrumb.EWCBreadcrumbDesktopWrapper>
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
  return <StyledBreadcrumb.EWCBreadcrumbWrapper>{breadcrumb}</StyledBreadcrumb.EWCBreadcrumbWrapper>;
};

export default Breadcrumb;
