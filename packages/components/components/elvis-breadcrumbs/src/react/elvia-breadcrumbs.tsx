import React, { useState, useEffect } from 'react';
import * as StyledBreadcrum from './styledComponents';

export interface Breadcrumb {
  url: string;
  title: string;
}

export interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  const childrenLength = breadcrumbs.length;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth ?? 0);

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

  if (windowWidth < 768) {
    return (
      <StyledBreadcrum.EWCBreadcrumbs>
        <StyledBreadcrum.EWCBreadcrumbIconLeft />
        <StyledBreadcrum.EWCBreadcrumbsLink href={breadcrumbs[childrenLength - 2].url}>
          {breadcrumbs[childrenLength - 2].title}
        </StyledBreadcrum.EWCBreadcrumbsLink>
      </StyledBreadcrum.EWCBreadcrumbs>
    );
  }
  return (
    <StyledBreadcrum.EWCBreadcrumbs>
      {breadcrumbs.map((breadcrumb, i) =>
        i < childrenLength - 1 ? (
          <>
            <StyledBreadcrum.EWCBreadcrumbsLink href={breadcrumb.url}>
              {breadcrumb.title}
            </StyledBreadcrum.EWCBreadcrumbsLink>
            <StyledBreadcrum.EWCBreadcrumbIconRight />
          </>
        ) : (
          <StyledBreadcrum.EWCBreadcrumbsLink href={breadcrumb.url}>
            {breadcrumb.title}
          </StyledBreadcrum.EWCBreadcrumbsLink>
        ),
      )}
    </StyledBreadcrum.EWCBreadcrumbs>
  );
};

export default Breadcrumbs;
