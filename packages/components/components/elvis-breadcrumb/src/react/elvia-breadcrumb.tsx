import React, { useState, useEffect } from 'react';
import * as StyledBreadcrumb from './styledComponents';

interface BreadcrumbLink {
  url: string;
  title: string;
}

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbLink[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs = [] }) => {
  const childrenLength = breadcrumbs.length;
  const [windowWidth, setWindowWidth] = useState(undefined);

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

  const MovbileBreadcrumb = () => {
    return (
      <span>
        <StyledBreadcrumb.EWCBreadcrumbIconLeft />
        <StyledBreadcrumb.EWCBreadcrumbLink href={breadcrumbs[childrenLength - 2].url}>
          {breadcrumbs[childrenLength - 2].title}
        </StyledBreadcrumb.EWCBreadcrumbLink>
      </span>
    );
  };

  const DesktopBreadcrumb = () => {
    const desktopBreadcrumbs = breadcrumbs.map((breadcrumb, index) => {
      if (index < childrenLength - 1) {
        return (
          <StyledBreadcrumb.EWCBreadcrumbDesktopWrapper key={index}>
            <StyledBreadcrumb.EWCBreadcrumbLink href={breadcrumb.url}>
              {breadcrumb.title}
            </StyledBreadcrumb.EWCBreadcrumbLink>
            <StyledBreadcrumb.EWCBreadcrumbIconRight />
          </StyledBreadcrumb.EWCBreadcrumbDesktopWrapper>
        );
      }
      return (
        <StyledBreadcrumb.EWCBreadcrumbLink href={breadcrumb.url} key={index}>
          {breadcrumb.title}
        </StyledBreadcrumb.EWCBreadcrumbLink>
      );
    });
    return desktopBreadcrumbs;
  };

  if (windowWidth < 768) {
    return (
      <StyledBreadcrumb.EWCBreadcrumbWrapper>{MovbileBreadcrumb()}</StyledBreadcrumb.EWCBreadcrumbWrapper>
    );
  }
  return <StyledBreadcrumb.EWCBreadcrumbWrapper>{DesktopBreadcrumb()}</StyledBreadcrumb.EWCBreadcrumbWrapper>;
};

export default Breadcrumb;
