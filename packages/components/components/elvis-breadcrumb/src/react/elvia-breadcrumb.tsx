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

const Breadcrumb: React.FC<BreadcrumbProps> = ({ breadcrumbs, webcomponent }) => {
  const [childrenLength, setChildrenLength] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  const [breadcrumbsState, setBreadcrumbsState] = useState<BreadcrumbLink[] | JSX.Element[]>();

  useEffect(() => {
    if (breadcrumbs !== undefined) {
      setBreadcrumbsState(breadcrumbs);
      setChildrenLength(breadcrumbs.length);
    }
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
      setBreadcrumbsState(newElements);
      setChildrenLength(newElements.length);
    }
  }, [webcomponent]);

  const mapSlottedItems = (slots: Record<string, any>, slotElements: string | any[]) => {
    const newElements = [];
    for (let i = 1; i < slotElements.length + 1; i++) {
      const title = Object.keys(slots).find((el) => {
        return el === 'breadcrumb-' + i;
      });
      title &&
        newElements.push(
          <div dangerouslySetInnerHTML={{ __html: title ? slots[title].innerHTML : '' }}></div>,
        );
    }
    return newElements;
  };

  if (childrenLength === 0 || !breadcrumbsState) {
    return null;
  }

  const MobileBreadcrumb = () => {
    return (
      <StyledBreadcrumb.EWCBreadcrumbDesktopWrapper>
        <StyledBreadcrumb.EWCBreadcrumbIconLeft />
        {'url' in breadcrumbsState[childrenLength - 2] ? (
          <StyledBreadcrumb.EWCBreadcrumbLink
            key={undefined}
            // "as any" to avoid type narrowing problem, ts2339
            href={(breadcrumbsState[childrenLength - 2] as any).url}
            isClickable={true}
          >
            {(breadcrumbsState[childrenLength - 2] as any).title}
          </StyledBreadcrumb.EWCBreadcrumbLink>
        ) : (
          // <StyledBreadcrumb.EWCBreadcrumbLink
          //   {...(breadcrumbsState[childrenLength - 2] as any).props}
          //   key={undefined}
          //   isClickable={true}
          // >
          //   {(breadcrumbsState[childrenLength - 2] as any).props.children}
          // </StyledBreadcrumb.EWCBreadcrumbLink>
          <h3>hello3</h3>
        )}
      </StyledBreadcrumb.EWCBreadcrumbDesktopWrapper>
    );
  };

  const DesktopBreadcrumb = () => {
    const desktopBreadcrumbs = breadcrumbsState.map((breadcrumb, index) => {
      !('url' in breadcrumb) && console.log(breadcrumb);

      if (index == childrenLength - 1) {
        return (
          <>
            {'url' in breadcrumb ? (
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
                // {...breadcrumb.props}
                key={index}
                isClickable={false}
                data-testid="breadcrumb-desktop-last-link"
              >
                {'dangerouslySetInnerHTML' in breadcrumb.props
                  ? breadcrumb.props.dangerouslySetInnerHTML.__html
                  : breadcrumb.props.children}
              </StyledBreadcrumb.EWCBreadcrumbLink>
            )}
          </>
        );
      }
      return (
        <StyledBreadcrumb.EWCBreadcrumbDesktopWrapper key={index}>
          {'url' in breadcrumb ? (
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
              // as={breadcrumb.type}
              key={undefined}
              isClickable={true}
              // {...breadcrumb.props}
              data-testid="breadcrumb-desktop-multiple-links"
            >
              {'dangerouslySetInnerHTML' in breadcrumb.props
                ? breadcrumb.props.dangerouslySetInnerHTML.__html
                : breadcrumb.props.children}
            </StyledBreadcrumb.EWCBreadcrumbLink>
            // { breadcrumb }
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
