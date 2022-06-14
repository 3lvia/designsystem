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
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';
import { warnDeprecatedProps } from '@elvia/elvis-toolbox';
import { config } from './config';

export interface PaginationProps {
  value: VisibleElements;
  numberOfElements: number;
  lastNumberLimit?: number;
  alignment?: 'left' | 'right';
  dropdownItems: DropdownItem[];
  dropdownMenuPosition: string;
  dropdownSelectedItemIndex: number;
  dropdownSelectedItemIndexOnChange?: (value: number) => void;
  labelOptions?: PaginationLabel;
  valueOnChange?: (value: VisibleElements) => void;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
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
  // Value represents the current visible elements decided by the pagination
  value = { firstElementIndex: undefined, lastElementIndex: undefined },
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
  // eslint-disable-next-line prefer-rest-params
  warnDeprecatedProps(config, arguments[0]);
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
  /** Number of pages that can be navigated to at each end before dots are displayed instead of numbers */
  const breakingPointNumber = 4;
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
    let lastElement = firstElementIndex + parseInt(selectedDropdownValue.value) - 1;
    // TODO: Test om man slipper denne ekstra sjekken
    if (selectedPageNumber === numberOfPages) {
      lastElement = numberOfElements;
    }

    const newValue = { firstElementIndex: firstElementIndex, lastElementIndex: lastElement };

    if (!webcomponent && valueOnChange) {
      valueOnChange(newValue);
    } else if (webcomponent) {
      webcomponent.setProps({ value: newValue }, true);
    }
  };

  /** Update selected page when value (visible elements) changed */
  const updateSelectedPageByVisibleElements = (visibleElements: VisibleElements): void => {
    if (visibleElements.firstElementIndex == undefined || visibleElements.lastElementIndex == undefined) {
      return;
    }
    const numberOfVisibleElements = visibleElements.lastElementIndex - visibleElements.firstElementIndex + 1;

    if (visibleElements.lastElementIndex === numberOfElements) {
      setSelectedPageNumber(numberOfPages);
    } else {
      setSelectedPageNumber(Math.ceil(visibleElements.lastElementIndex / numberOfVisibleElements));
    }
  };

  /** -- PAGES -- */
  const getAriaLabel = (pageNumber: number): string => {
    return pageNumber === selectedPageNumber ? 'Valgt side' : 'Velg side ' + pageNumber;
  };

  const getPageElement = (pageNumber: number, pageIndex: number): JSX.Element => {
    const isFirstPage = pageNumber === 1;
    const isLastPage = pageNumber === numberOfPages;
    return (
      <PaginatorPage
        isFirst={isFirstPage}
        isLast={isLastPage}
        key={pageIndex}
        onClick={() => setSelectedPageNumber(pageNumber)}
        selected={isSelectedPageNumber(pageNumber)}
        aria-label={getAriaLabel(pageNumber)}
        aria-current={pageNumber === selectedPageNumber}
      >
        {pageNumber}
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

  const isSelectedPageNumber = (pageNumber: number): boolean => {
    return pageNumber === selectedPageNumber;
  };
  const areNumbersAtBeginning = (pageNumber: number): boolean => {
    return pageNumber <= breakingPointNumber;
  };
  const areNumbersInCenter = (pageNumber: number): boolean => {
    return pageNumber > breakingPointNumber && pageNumber < numberOfPages - 2;
  };
  const areNumbersAtEnd = (pageNumber: number): boolean => {
    return pageNumber >= numberOfPages - 2;
  };

  const isNumberFirstOrLast = (pageNumber: number): boolean => {
    return pageNumber === 1 || pageNumber === numberOfPages;
  };
  const isNumberAtBeginningVisible = (pageNumber: number, maxValue: number): boolean => {
    return pageNumber <= maxValue && !isNumberFirstOrLast(pageNumber);
  };
  const isNumberInCenterVisible = (pageNumber: number, proximityRange: number): boolean => {
    return (
      pageNumber >= selectedPageNumber - proximityRange &&
      pageNumber <= selectedPageNumber + proximityRange &&
      !isNumberFirstOrLast(pageNumber)
    );
  };
  const isNumberAtEndVisible = (pageNumber: number, proximityRange: number): boolean => {
    return pageNumber >= numberOfPages - proximityRange && !isNumberFirstOrLast(pageNumber);
  };

  const shouldHaveVisibleFirstDots = (): boolean => {
    return (
      (selectedPageNumber > 4 && numberOfPages > 7 && !isMobile) ||
      (selectedPageNumber > 3 && numberOfPages > 4 && isMobile)
    );
  };
  const shouldHaveVisibleLastDots = (): boolean => {
    return (
      (selectedPageNumber < numberOfPages - 3 && numberOfPages > 7 && !isMobile) ||
      (selectedPageNumber < numberOfPages - 2 && numberOfPages > 5 && isMobile)
    );
  };

  /** Returns the numbers and dots that should be visible inside the paginator as a JSX element */
  const PaginatorNumbersAndDots = (): JSX.Element => {
    const visibleNumbersAndDots = [];

    const getBetweenNumberAtBeginning = (pageNumber: number, pageIndex: number): JSX.Element | null => {
      if (
        (isNumberAtBeginningVisible(pageNumber, 6) && !isMobile) ||
        (isNumberAtBeginningVisible(pageNumber, 4) && isMobile && selectedPageNumber !== 4) ||
        (isMobile &&
          selectedPageNumber === 4 &&
          pageNumber >= selectedPageNumber - 1 &&
          pageNumber <= selectedPageNumber + 1 &&
          pageNumber < 6)
      ) {
        return getPageElement(pageNumber, pageIndex);
      }
      return null;
    };

    const getBetweenNumberInCenter = (pageNumber: number, pageIndex: number): JSX.Element | null => {
      if (
        (isNumberInCenterVisible(pageNumber, 2) && !isMobile) ||
        (isNumberInCenterVisible(pageNumber, 1) && isMobile)
      ) {
        return getPageElement(pageNumber, pageIndex);
      }
      return null;
    };

    const getBetweenNumberAtEnd = (pageNumber: number, pageIndex: number): JSX.Element | null => {
      if (
        (isNumberAtEndVisible(pageNumber, 5) && !isMobile) ||
        (isNumberAtEndVisible(pageNumber, 3) && isMobile)
      ) {
        return getPageElement(pageNumber, pageIndex);
      }
      return null;
    };

    const getBetweenPageNumbers = (): (JSX.Element | null)[] => {
      const pageNumbersArray = Array.from(Array(numberOfPages + 1).keys()).slice(1);
      if (areNumbersAtBeginning(selectedPageNumber)) {
        return pageNumbersArray.map((pageNumber, pageIndex) => {
          return getBetweenNumberAtBeginning(pageNumber, pageIndex);
        });
      } else if (areNumbersInCenter(selectedPageNumber)) {
        return pageNumbersArray.map((pageNumber, pageIndex) => {
          return getBetweenNumberInCenter(pageNumber, pageIndex);
        });
      } else if (areNumbersAtEnd(selectedPageNumber)) {
        return pageNumbersArray.map((pageNumber, pageIndex) => {
          return getBetweenNumberAtEnd(pageNumber, pageIndex);
        });
      }
      return [];
    };

    const getFirstPageNumber = (): JSX.Element => {
      return getPageElement(1, 0);
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
        <PaginatorInfoAmount isMobile={windowWidth < 768} data-testid="info-amount">
          {labelOptionsState.of} {numberOfElements} {labelOptionsState.label}
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
        {showPaginationNumbers ? <PaginatorNumbersAndDots data-testid="paginators" /> : null}
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
