import React , { useState, useEffect} from 'react';
import { EWCBreadcrumbs, EWCBreadcrumbsLink, EWCBreadcrumbIconRight, EWCBreadcrumbIconLeft } from './styledComponents'

export interface Breadcrumb {
  url: string;
  title: string;
}

export interface BreadcrumbsProps {
  // className?: string;
  // style?: React.CSSProperties;
  // isCompact: boolean;
  breadcrumbs: Breadcrumb[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({breadcrumbs}) => {
  const childrenLength = breadcrumbs.length;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth ?? 0)

  const getWindowDimensions = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', getWindowDimensions);
    return () => {
      window.removeEventListener('resize', getWindowDimensions);
    }})

  //hvis den er null
  if(childrenLength === 0) {
    return null;
  }

  console.log({windowWidth})
  if(windowWidth < 768) {
    return (
      <EWCBreadcrumbs>
            <EWCBreadcrumbIconLeft />
            <EWCBreadcrumbsLink href={breadcrumbs[childrenLength-2].url}>{breadcrumbs[childrenLength-2].title}</EWCBreadcrumbsLink>
      </EWCBreadcrumbs>
    )
  }
    return (
      <EWCBreadcrumbs>
        {breadcrumbs.map((breadcrumb, i) =>
          i < childrenLength - 1 ? (
            <>
              <EWCBreadcrumbsLink href={breadcrumb.url}>{breadcrumb.title}</EWCBreadcrumbsLink>
              <EWCBreadcrumbIconRight />
            </>
          ) : (
            <EWCBreadcrumbsLink href={breadcrumb.url}>{breadcrumb.title}</EWCBreadcrumbsLink>
          )
        )}
      </EWCBreadcrumbs>
    )
};

export default Breadcrumbs;
