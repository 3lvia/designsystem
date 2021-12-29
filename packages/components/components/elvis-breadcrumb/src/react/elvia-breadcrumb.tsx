import React, { useState, useEffect } from 'react';
import * as StyledBreadcrumb from './styledComponents';

interface BreadcrumbLink {
  url: string;
  title: string;
}

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbLink[] | JSX.Element[];
  webcomponent: any;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs = [], webcomponent }) => {
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

  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    // Get slotted items from web component
    const slots = webcomponent.getAllSlots();

    const slotElements = Object.keys(slots).filter((el) => el.includes('breadcrumb-'));
    if (slotElements.length !== 0) {
      const newElements = mapSlottedItems(slots, slotElements);
      // breadcrumbs = newElements;
      breadcrumbs = newElements;
      setChildrenLength(newElements.length);
    }
  }, [webcomponent]);

  const mapSlottedItems = (slots: Record<string, any>, slotElements: string | any[]) => {
    const newElements: JSX.Element[] = [];
    for (let i = 1; i < slotElements.length + 1; i++) {
      const title = Object.keys(slots).find((el) => {
        return el === 'breadcrumb-' + i;
      });
      title && newElements.push(slots[title]);
    }
    return newElements;
  };

  console.log(breadcrumbs);
  if (childrenLength === 0) {
    return null;
  }

  const MobileBreadcrumb = () => {
    return (
      <StyledBreadcrumb.EWCBreadcrumbDesktopWrapper>
        <StyledBreadcrumb.EWCBreadcrumbIconLeft />
        {'title' in breadcrumbs[childrenLength - 2] ? (
          <StyledBreadcrumb.EWCBreadcrumbLink
            key={undefined}
            // "as any" to avoid type narrowing problem, ts2339
            href={(breadcrumbs[childrenLength - 2] as any).url}
            isClickable={true}
          >
            {(breadcrumbs[childrenLength - 2] as any).title}
          </StyledBreadcrumb.EWCBreadcrumbLink>
        ) : (
          <StyledBreadcrumb.EWCBreadcrumbLink
            {...(breadcrumbs[childrenLength - 2] as any).props}
            key={undefined}
            isClickable={true}
          >
            {(breadcrumbs[childrenLength - 2] as any).props.children}
          </StyledBreadcrumb.EWCBreadcrumbLink>
        )}
      </StyledBreadcrumb.EWCBreadcrumbDesktopWrapper>
    );
  };

  const DesktopBreadcrumb = () => {
    const desktopBreadcrumbs = breadcrumbs.map((breadcrumb, index) => {
      if (index == childrenLength - 1) {
        return (
          <>
            {'title' in breadcrumb ? (
              <StyledBreadcrumb.EWCBreadcrumbLink
                href={breadcrumb.url}
                key={index}
                isClickable={false}
                data-testid="breadcrumb-desktop-last-link"
              >
                {breadcrumb.title}
              </StyledBreadcrumb.EWCBreadcrumbLink>
            ) : (
              <StyledBreadcrumb.EWCBreadcrumbLink
                {...breadcrumb.props}
                key={index}
                isClickable={false}
                data-testid="breadcrumb-desktop-last-link"
              >
                {breadcrumb.props.children}
              </StyledBreadcrumb.EWCBreadcrumbLink>
            )}
          </>
        );
      }
      return (
        <StyledBreadcrumb.EWCBreadcrumbDesktopWrapper key={index}>
          {'title' in breadcrumb ? (
            <StyledBreadcrumb.EWCBreadcrumbLink
              key={undefined}
              href={breadcrumb.url}
              isClickable={true}
              data-testid="breadcrumb-desktop-multiple-links"
            >
              {breadcrumb.title}
            </StyledBreadcrumb.EWCBreadcrumbLink>
          ) : (
            <StyledBreadcrumb.EWCBreadcrumbLink
              as={breadcrumb.type}
              key={undefined}
              isClickable={true}
              {...breadcrumb.props}
              data-testid="breadcrumb-desktop-multiple-links"
            >
              {breadcrumb.props.children}
            </StyledBreadcrumb.EWCBreadcrumbLink>
          )}
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
