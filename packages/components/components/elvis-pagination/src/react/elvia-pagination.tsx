import React, { FC, useState, useEffect, CSSProperties } from 'react';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import { Icon } from '@elvia/elvis-icon/react';
import { DropdownItem, VisibleElements, PaginationLabel } from './elvia-pagination.types';
import {
  Paginator,
  PaginatorPage,
  PaginatorDots,
  PaginatorInfoAmount,
  PaginatorInfoContainer,
  PaginatorInfoDropdown,
  PaginatorInfoText,
  PaginatorNumbersArea,
  PaginatorSelectorArea,
  PaginatorSelectorArrowBtn,
} from './styledComponents';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { warnDeprecatedProps } from '@elvia/elvis-toolbox';
import { config } from './config';

export interface PaginationProps {
  value?: VisibleElements;
  numberOfElements?: number;
  lastNumberLimit?: number;
  alignment?: 'left' | 'right';
  dropdownItems?: DropdownItem[];
  dropdownMenuPosition?: 'top' | 'bottom' | 'auto';
  dropdownSelectedItemIndex?: number;
  dropdownSelectedItemIndexOnChange?: (value: number) => void;
  labelOptions?: PaginationLabel;
  valueOnChange?: (value: VisibleElements) => void;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `alignment`.
   */
  isRightAligned?: boolean;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `dropdownMenuPosition`.
   */
  dropdownMenuPos?: string;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `dropdownSelectedItemIndex`.
   */
  selectedDropdownItemIndex?: number;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `dropdownSelectedItemIndexOnChange`.
   */
  selectedDropdownItemIndexOnChange?: (value: number) => void;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `labelOptions.displaying`.
   */
  labelDisplaying?: string;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `labelOptions.label`.
   */
  label?: string;
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `labelOptions.of`.
   */
  labelOf?: string;
}

const defaultPaginationOptions: DropdownItem[] = [
  {
    value: '10',
    label: '10',
  },
  {
    value: '20',
    label: '20',
  },
  {
    value: '30',
    label: '30',
  },
  {
    value: '40',
    label: '40',
  },
];

const defaultLabelOptions: PaginationLabel = {
  displaying: 'Viser',
  of: 'av',
  label: 'elementer',
};

const Pagination: FC<PaginationProps> = function ({
  // Value represents the current visible elements in the pagination
  value = { start: undefined, end: undefined },
  numberOfElements = 0,
  lastNumberLimit,
  alignment = 'left',
  dropdownMenuPosition = 'bottom',
  dropdownItems = defaultPaginationOptions,
  dropdownSelectedItemIndex = 0,
  dropdownSelectedItemIndexOnChange,
  labelOptions,
  valueOnChange,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  warnDeprecatedProps(config, arguments[0]);

  /** Max page numbers that can be visible at the same time */
  const maxVisiblePageNumbers = 9;
  const maxVisiblePageNumbersMo = 7;
  /** How many pages that should be displayed between the dots when there are dots on both sides */
  const numOfPagesBetweenDots = 5;
  const numOfPagesBetweenDotsMo = 3;

  /** How many pages that can be displayed on each end before/after dots. 2 represents the space for the dots and the last or first number*/
  const numOfPagesBeforeDots = maxVisiblePageNumbers - 2;
  const numOfPagesBeforeDotsMo = maxVisiblePageNumbersMo - 2;
  /** How many pages that should visible on each side of the selected page when in center (Dots are visible on both sides) */
  const numOfPagesBesideSelected = Math.floor(numOfPagesBetweenDots / 2);
  const numOfPagesBesideSelectedMo = Math.floor(numOfPagesBetweenDotsMo / 2);
  /** How many pages that can be navigated to at each end before dots are displayed instead of numbers */
  const visibleDotsBreakingPoint = numOfPagesBeforeDots - numOfPagesBesideSelected;
  const visibleDotsBreakingPointMo = numOfPagesBeforeDotsMo - numOfPagesBesideSelectedMo;

  const [selectedPageNumber, setSelectedPageNumber] = useState(1);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(
    dropdownItems[dropdownSelectedItemIndex],
  );
  const [showPaginationNumbers, setShowPaginationNumbers] = useState(true);
  /** Calculate number of pages based on total elements divided by amount of elements showing. */
  const [numberOfPages, setNumberOfPages] = useState(
    Math.ceil(numberOfElements / parseInt(selectedDropdownValue.value)),
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [labelOptionsState, setLabelOptionsState] = useState<PaginationLabel>({
    ...defaultLabelOptions,
    ...labelOptions,
  });
  const isMobile = windowWidth < 768;

  /** If selectedDropdownValue is not a number, hide the pagination TODO: Varsle bruker? */
  if (isNaN(parseInt(selectedDropdownValue.value))) {
    setNumberOfPages(0);
    setShowPaginationNumbers(false);
  }

  useEffect(() => {
    updateSelectedPageByVisibleElements(value);
  }, [value]);

  useEffect(() => {
    setLabelOptionsState({ ...defaultLabelOptions, ...labelOptions });
  }, [labelOptions]);

  useEffect(() => {
    if (numberOfElements !== 0) {
      handleDropdownValueChange(selectedDropdownValue);
    }
  }, [numberOfElements]);

  useEffect(() => {
    dispatchVisibleElementsValueEvent(selectedPageNumber);
  }, [selectedPageNumber, selectedDropdownValue]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfElements / parseInt(selectedDropdownValue.value)));
  }, [numberOfElements, selectedDropdownValue]);

  useEffect(() => {
    setSelectedDropdownValue(dropdownItems[dropdownSelectedItemIndex]);
  }, [dropdownItems, dropdownSelectedItemIndex]);

  useEffect(() => {
    setWindowDimensions();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', setWindowDimensions);
    return () => {
      window.removeEventListener('resize', setWindowDimensions);
    };
  });

  const setWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
  };

  const shouldHaveLeftArrow = (): boolean => {
    return showPaginationNumbers && selectedPageNumber > 1;
  };
  const shouldHaveRightArrow = (): boolean => {
    return showPaginationNumbers && selectedPageNumber < numberOfPages;
  };

  /** Update visible elements value and dispatch value events */
  const dispatchVisibleElementsValueEvent = (selectedPageNumber: number): void => {
    if (selectedPageNumber <= 0 || selectedPageNumber > numberOfPages) {
      return;
    }

    const firstElementIndex =
      parseInt(selectedDropdownValue.value) * selectedPageNumber - parseInt(selectedDropdownValue.value) + 1;
    let lastElementIndex = firstElementIndex + parseInt(selectedDropdownValue.value) - 1;
    // TODO: Test om man slipper denne ekstra sjekken
    if (selectedPageNumber === numberOfPages) {
      lastElementIndex = numberOfElements;
    }

    const newValue = { start: firstElementIndex, end: lastElementIndex };

    if (!webcomponent && valueOnChange) {
      valueOnChange(newValue);
    } else if (webcomponent) {
      webcomponent.setProps({ value: newValue }, true);
      webcomponent.triggerEvent('valueOnChange', newValue);
    }
  };

  /** Update selected page when value (visible elements) changed */
  const updateSelectedPageByVisibleElements = (visibleElements: VisibleElements): void => {
    if (visibleElements.start == undefined || visibleElements.end == undefined) {
      return;
    }
    const numberOfVisibleElements = visibleElements.end - visibleElements.start + 1;

    if (visibleElements.end === numberOfElements) {
      setSelectedPageNumber(numberOfPages);
    } else {
      setSelectedPageNumber(Math.ceil(visibleElements.end / numberOfVisibleElements));
    }
  };

  /** -- PAGES -- */
  const getAriaLabel = (pageNumber: number): string => {
    return pageNumber === selectedPageNumber ? 'Valgt side' : 'Velg side ' + pageNumber;
  };

  const getPageElement = (pageNumber: number, pageIndex: number): JSX.Element => {
    return (
      <PaginatorPage
        key={pageIndex}
        pageNumber={pageNumber}
        onClick={() => setSelectedPageNumber(pageNumber)}
        selected={isSelectedPageNumber(pageNumber)}
        aria-label={getAriaLabel(pageNumber)}
        aria-current={pageNumber === selectedPageNumber}
        data-testid={`paginator-button-${pageIndex}`}
      >
        {pageNumber.toLocaleString('nb-NO')}
      </PaginatorPage>
    );
  };

  const getDotsElement = (dotKey: string, isVisible: boolean): JSX.Element => {
    return (
      <PaginatorDots key={dotKey} hide={!isVisible}>
        ...
      </PaginatorDots>
    );
  };

  const shouldHaveVisibleFirstDots = (): boolean => {
    return (
      selectedPageNumber > (isMobile ? visibleDotsBreakingPointMo : visibleDotsBreakingPoint) &&
      numberOfPages > (isMobile ? maxVisiblePageNumbersMo : maxVisiblePageNumbers)
    );
  };
  const shouldHaveVisibleLastDots = (): boolean => {
    return (
      selectedPageNumber <=
        numberOfPages - (isMobile ? visibleDotsBreakingPointMo : visibleDotsBreakingPoint) &&
      numberOfPages > (isMobile ? maxVisiblePageNumbersMo : maxVisiblePageNumbers)
    );
  };

  const isSelectedPageNumber = (pageNumber: number): boolean => {
    return pageNumber === selectedPageNumber;
  };

  const isNumberFirstOrLast = (pageNumber: number): boolean => {
    return pageNumber === 1 || pageNumber === numberOfPages;
  };
  const areAllPageNumbersVisible = (): boolean => {
    return numberOfPages === (isMobile ? maxVisiblePageNumbersMo : maxVisiblePageNumbers);
  };

  const isNumberAtBeginningAndVisible = (pageNumber: number): boolean => {
    return (
      selectedPageNumber <= (isMobile ? visibleDotsBreakingPointMo : visibleDotsBreakingPoint) &&
      pageNumber <= (isMobile ? numOfPagesBeforeDotsMo : numOfPagesBeforeDots)
    );
  };
  const isNumberInCenterAndVisible = (pageNumber: number): boolean => {
    return (
      selectedPageNumber > (isMobile ? visibleDotsBreakingPointMo : visibleDotsBreakingPoint) &&
      selectedPageNumber <=
        numberOfPages - (isMobile ? visibleDotsBreakingPointMo : visibleDotsBreakingPoint) &&
      pageNumber >= selectedPageNumber - (isMobile ? numOfPagesBesideSelectedMo : numOfPagesBesideSelected) &&
      pageNumber <= selectedPageNumber + (isMobile ? numOfPagesBesideSelectedMo : numOfPagesBesideSelected)
    );
  };
  const isNumberAtEndAndVisible = (pageNumber: number): boolean => {
    return (
      selectedPageNumber >
        numberOfPages - (isMobile ? visibleDotsBreakingPointMo : visibleDotsBreakingPoint) &&
      pageNumber > numberOfPages - (isMobile ? numOfPagesBeforeDotsMo : numOfPagesBeforeDots)
    );
  };

  /** Returns the numbers and dots that should be visible inside the paginator as a JSX element */
  const PaginatorNumbersAndDots = (): JSX.Element => {
    const visibleNumbersAndDots = [];
    const pageNumbersArray = Array.from(Array(numberOfPages + 1).keys()).slice(1);
    const betweenPageNumbers: JSX.Element[] = [];

    const getFirstPageNumber = (): JSX.Element => {
      return getPageElement(1, 0);
    };

    const getBetweenPageNumbers = (): (JSX.Element | null)[] => {
      pageNumbersArray.forEach((pageNumber, pageIndex) => {
        if (isNumberFirstOrLast(pageNumber)) {
          return;
        } else if (areAllPageNumbersVisible()) {
          betweenPageNumbers.push(getPageElement(pageNumber, pageIndex));
        } else if (isNumberAtBeginningAndVisible(pageNumber)) {
          betweenPageNumbers.push(getPageElement(pageNumber, pageIndex));
        } else if (isNumberInCenterAndVisible(pageNumber)) {
          betweenPageNumbers.push(getPageElement(pageNumber, pageIndex));
        } else if (isNumberAtEndAndVisible(pageNumber)) {
          betweenPageNumbers.push(getPageElement(pageNumber, pageIndex));
        }
      });

      return betweenPageNumbers;
    };

    const getLastPageNumber = (): JSX.Element | null => {
      // TODO: Handle all user errors at one place
      if (numberOfElements <= parseInt(selectedDropdownValue.value)) {
        return null;
      }
      if (lastNumberLimit !== undefined) {
        if (lastNumberLimit <= numberOfElements && !(selectedPageNumber >= numberOfPages - 3)) {
          return null;
        }
      }

      return getPageElement(numberOfPages, numberOfPages - 1);
    };

    visibleNumbersAndDots.push(
      getFirstPageNumber(),
      getDotsElement('first-dots', shouldHaveVisibleFirstDots()),
      getBetweenPageNumbers(),
      getDotsElement('last-dots', shouldHaveVisibleLastDots()),
      getLastPageNumber(),
    );

    return <PaginatorNumbersArea>{visibleNumbersAndDots}</PaginatorNumbersArea>;
  };

  /** -- DROPDOWN -- */
  /** Dropdown item is not valid if the value is not a number */
  const isValidDropdownItem = (dropdownItem: DropdownItem): boolean => {
    return !isNaN(parseInt(dropdownItem.value));
  };

  const isValidSelectedPageNumber = (): boolean => {
    return selectedPageNumber > 0 && selectedPageNumber <= numberOfPages;
  };

  /** Update pagination values and dispatch dropdownSelectedItemIndex events */
  const handleDropdownValueChange = (newSelectedDropdownValue: DropdownItem): void => {
    // Don't update or dispatch new event if the value is identical to previous value.
    if (newSelectedDropdownValue === selectedDropdownValue) {
      return;
    }
    if (!isValidDropdownItem(newSelectedDropdownValue)) {
      setShowPaginationNumbers(false);
      return;
    }
    if (!showPaginationNumbers) {
      setShowPaginationNumbers(true);
    }
    if (!isValidSelectedPageNumber) {
      setSelectedPageNumber(numberOfPages);
    }
    setSelectedDropdownValue(newSelectedDropdownValue);

    const selectedIndex = dropdownItems.indexOf(newSelectedDropdownValue);
    if (!webcomponent && dropdownSelectedItemIndexOnChange) {
      dropdownSelectedItemIndexOnChange(selectedIndex);
    } else if (webcomponent) {
      webcomponent.setProps({ dropdownSelectedItemIndex: selectedIndex }, true);
      webcomponent.triggerEvent('dropdownSelectedItemIndexOnChange', selectedIndex);
    }
  };

  return (
    <Paginator
      isRightAligned={alignment === 'right'}
      className={`${className ? className : ''}`}
      style={inlineStyle}
      data-testid="pagination"
      {...rest}
    >
      <PaginatorInfoContainer>
        <PaginatorInfoText data-testid="info-text">{labelOptionsState.displaying}</PaginatorInfoText>
        <PaginatorInfoDropdown>
          <Dropdown
            isCompact
            placeholder=""
            items={dropdownItems}
            menuPosition={dropdownMenuPosition}
            value={selectedDropdownValue}
            valueOnChange={(event: any) => handleDropdownValueChange(event)}
            data-testid="dropdown"
          ></Dropdown>
        </PaginatorInfoDropdown>
        <PaginatorInfoAmount data-testid="info-amount">
          {labelOptionsState.of} {numberOfElements.toLocaleString('nb-NO')} {labelOptionsState.label}
        </PaginatorInfoAmount>
      </PaginatorInfoContainer>
      <PaginatorSelectorArea role="navigation">
        <PaginatorSelectorArrowBtn
          visible={shouldHaveLeftArrow()}
          onClick={() => setSelectedPageNumber(selectedPageNumber - 1)}
          data-testid="selector-arrow-btn-left"
          aria-label="Forrige side"
        >
          <Icon name="arrowLongLeft" size="xs" />
        </PaginatorSelectorArrowBtn>
        {showPaginationNumbers ? <PaginatorNumbersAndDots /> : null}
        <PaginatorSelectorArrowBtn
          visible={shouldHaveRightArrow()}
          onClick={() => setSelectedPageNumber(selectedPageNumber + 1)}
          data-testid="selector-arrow-btn-right"
          aria-label="Neste side"
        >
          <Icon name="arrowLongRight" size="xs" />
        </PaginatorSelectorArrowBtn>
      </PaginatorSelectorArea>
    </Paginator>
  );
};

export default Pagination;
