import React, { FC, useState, useEffect, useMemo } from 'react';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import { DropdownItem, VisibleElements, PaginationLabel, PaginationProps } from './elvia-pagination.types';
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
import { useRovingFocus, warnDeprecatedProps, IconWrapper } from '@elvia/elvis-toolbox';
import arrowLongLeft from '@elvia/elvis-assets-icons/dist/icons/arrowLongLeft';
import arrowLongRight from '@elvia/elvis-assets-icons/dist/icons/arrowLongRight';
import { config } from './config';

const defaultPaginationOptions: DropdownItem[] = [
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '30', label: '30' },
  { value: '40', label: '40' },
];

const defaultLabelOptions: PaginationLabel = {
  displaying: 'Viser',
  of: 'av',
  label: 'elementer',
};
const defaultValue: VisibleElements = { start: undefined, end: undefined };

const Pagination: FC<PaginationProps> = function ({
  // Value represents the current visible elements in the pagination
  value = defaultValue,
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
    parseInt(dropdownItems[dropdownSelectedItemIndex].value),
  );
  const [showPaginationNumbers, setShowPaginationNumbers] = useState(true);
  /** Calculate number of pages based on total elements divided by amount of elements showing. */
  const [numberOfPages, setNumberOfPages] = useState(Math.ceil(numberOfElements / selectedDropdownValue));
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [labelOptionsState, setLabelOptionsState] = useState<PaginationLabel>({
    ...defaultLabelOptions,
    ...labelOptions,
  });
  const isMobile = useMemo(() => windowWidth < 768, [windowWidth]);
  const { ref: listContainerRef } = useRovingFocus<HTMLElement>({ dir: 'horizontal' });
  const [visibleElements, setVisibleElements] = useState<VisibleElements>(value);

  useEffect(() => {
    setVisibleElements(value);
  }, [value]);

  /** If selectedDropdownValue is not a number, hide the pagination TODO: Varsle bruker? */
  useEffect(() => {
    if (isNaN(selectedDropdownValue)) {
      setNumberOfPages(0);
      setShowPaginationNumbers(false);
    }
  }, [selectedDropdownValue]);

  useEffect(() => {
    updateSelectedPageByVisibleElements(value);
  }, [value]);

  useEffect(() => {
    setLabelOptionsState({ ...defaultLabelOptions, ...labelOptions });
  }, [labelOptions]);

  useEffect(() => {
    if (numberOfElements !== 0) {
      handleDropdownValueChange(selectedDropdownValue.toString());
    }
  }, [numberOfElements]);

  useEffect(() => {
    updateSelectedPageByVisibleElements(visibleElements);
  }, [numberOfPages]);

  useEffect(() => {
    if (numberOfElements !== 0) {
      updateVisibleElementsForSelectedPageNumberChange();
    }
  }, [selectedPageNumber]);

  useEffect(() => {
    updateVisibleElementsForDropdownChange();
  }, [selectedDropdownValue]);

  useEffect(() => {
    triggerValueOnChangeEvent();
  }, [visibleElements]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfElements / selectedDropdownValue));
  }, [numberOfElements, selectedDropdownValue]);

  useEffect(() => {
    setSelectedDropdownValue(parseInt(dropdownItems[dropdownSelectedItemIndex].value));
  }, [dropdownItems, dropdownSelectedItemIndex]);

  useEffect(() => {
    const setWindowDimensions = () => {
      setWindowWidth(window.innerWidth);
    };
    setWindowDimensions();
    window.addEventListener('resize', setWindowDimensions);
    return () => {
      window.removeEventListener('resize', setWindowDimensions);
    };
  }, []);

  const triggerValueOnChangeEvent = (): void => {
    valueOnChange?.(visibleElements);
    webcomponent?.setProps({ value: visibleElements }, true);
    webcomponent?.triggerEvent('valueOnChange', visibleElements);
  };

  const updateVisibleElementsForDropdownChange = (): void => {
    setVisibleElements((previousValue) => {
      if (previousValue.start === undefined) {
        return previousValue;
      }
      // Get the new value start index where the range contains the previous start
      const firstElementIndex =
        Math.floor((previousValue.start - 1) / selectedDropdownValue) * selectedDropdownValue + 1;
      const lastElementIndex = Math.min(firstElementIndex + selectedDropdownValue - 1, numberOfElements);
      return {
        start: firstElementIndex,
        end: lastElementIndex,
      };
    });
  };

  const updateVisibleElementsForSelectedPageNumberChange = (): void => {
    if (numberOfElements === 0) {
      setVisibleElements({ start: 0, end: 0 });
      return;
    }
    const firstElementIndex = selectedDropdownValue * selectedPageNumber - selectedDropdownValue + 1;
    const lastElementIndex = Math.min(firstElementIndex + selectedDropdownValue - 1, numberOfElements);
    setVisibleElements({
      start: firstElementIndex,
      end: lastElementIndex,
    });
  };

  /** Update selected page when value (visible elements) changed */
  const updateSelectedPageByVisibleElements = (visibleElements: VisibleElements): void => {
    if (visibleElements.start === undefined || visibleElements.end === undefined) {
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

  const getPageElement = (pageNumber: number): JSX.Element => {
    return (
      <PaginatorPage
        key={pageNumber}
        pageNumber={pageNumber}
        onClick={() => setSelectedPageNumber(pageNumber)}
        selected={pageNumber === selectedPageNumber}
        aria-current={pageNumber === selectedPageNumber}
        aria-label={getAriaLabel(pageNumber)}
        data-testid={`paginator-button-${pageNumber}`}
      >
        {pageNumber.toLocaleString('nb-NO')}
      </PaginatorPage>
    );
  };

  const getDotsElement = (dotKey: string): JSX.Element => {
    return <PaginatorDots key={dotKey}>...</PaginatorDots>;
  };

  const shouldHaveVisibleFirstDots = () => {
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

  const PaginatorNumbersAndDots: FC = () => {
    const visibleNumbersAndDots = [];
    const pageNumbersArray = Array.from(Array(numberOfPages + 1).keys()).slice(1);
    const betweenPageNumbers: JSX.Element[] = [];

    const getFirstPageNumber = (): JSX.Element => {
      return getPageElement(1);
    };

    const getBetweenPageNumbers = (): (JSX.Element | null)[] => {
      pageNumbersArray.forEach((pageNumber) => {
        if (isNumberFirstOrLast(pageNumber)) {
          return;
        } else if (areAllPageNumbersVisible()) {
          betweenPageNumbers.push(getPageElement(pageNumber));
        } else if (isNumberAtBeginningAndVisible(pageNumber)) {
          betweenPageNumbers.push(getPageElement(pageNumber));
        } else if (isNumberInCenterAndVisible(pageNumber)) {
          betweenPageNumbers.push(getPageElement(pageNumber));
        } else if (isNumberAtEndAndVisible(pageNumber)) {
          betweenPageNumbers.push(getPageElement(pageNumber));
        }
      });

      return betweenPageNumbers;
    };

    const getLastPageNumber = (): JSX.Element | null => {
      // TODO: Handle all user errors at one place
      if (numberOfElements <= selectedDropdownValue) {
        return null;
      }
      if (lastNumberLimit !== undefined) {
        if (lastNumberLimit <= numberOfElements && !(selectedPageNumber >= numberOfPages - 3)) {
          return null;
        }
      }

      return getPageElement(numberOfPages);
    };

    visibleNumbersAndDots.push(
      getFirstPageNumber(),
      shouldHaveVisibleFirstDots() ? getDotsElement('first-dots') : null,
      getBetweenPageNumbers(),
      shouldHaveVisibleLastDots() ? getDotsElement('last-dots') : null,
      getLastPageNumber(),
    );

    return <PaginatorNumbersArea>{visibleNumbersAndDots}</PaginatorNumbersArea>;
  };

  /** -- DROPDOWN -- */
  /** Dropdown item is not valid if the value is not a number */
  const isValidDropdownItem = (dropdownItem: string): boolean => {
    return !isNaN(parseInt(dropdownItem));
  };

  /** Update pagination values and dispatch dropdownSelectedItemIndex events */
  const handleDropdownValueChange = (newSelectedDropdownValue: string): void => {
    // Don't update or dispatch new event if the value is identical to previous value.
    if (parseInt(newSelectedDropdownValue) === selectedDropdownValue) {
      return;
    }
    if (!isValidDropdownItem(newSelectedDropdownValue)) {
      setShowPaginationNumbers(false);
      return;
    }
    if (!showPaginationNumbers) {
      setShowPaginationNumbers(true);
    }
    setSelectedDropdownValue(parseInt(newSelectedDropdownValue));

    const selectedIndex = dropdownItems.findIndex((item) => item.value === newSelectedDropdownValue);
    dropdownSelectedItemIndexOnChange?.(selectedIndex);
    webcomponent?.setProps({ dropdownSelectedItemIndex: selectedIndex }, true);
    webcomponent?.triggerEvent('dropdownSelectedItemIndexOnChange', selectedIndex);
  };

  const shouldHaveLeftArrow = (): boolean => {
    return showPaginationNumbers && selectedPageNumber > 1;
  };
  const shouldHaveRightArrow = (): boolean => {
    return showPaginationNumbers && selectedPageNumber < numberOfPages;
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
            className="number-of-items-dropdown"
            value={selectedDropdownValue.toString()}
            valueOnChange={(event: string) => handleDropdownValueChange(event)}
            data-testid="dropdown"
            ariaLabel={`viser ${selectedDropdownValue} ${labelOptionsState.label} per side`}
          />
        </PaginatorInfoDropdown>
        <PaginatorInfoAmount data-testid="info-amount">
          {labelOptionsState.of} {numberOfElements.toLocaleString('nb-NO')} {labelOptionsState.label}
        </PaginatorInfoAmount>
      </PaginatorInfoContainer>
      <PaginatorSelectorArea role="navigation" ref={listContainerRef}>
        <PaginatorSelectorArrowBtn
          visible={shouldHaveLeftArrow()}
          aria-hidden={!shouldHaveLeftArrow()}
          onClick={() => setSelectedPageNumber(selectedPageNumber - 1)}
          data-testid="selector-arrow-btn-left"
          aria-label="Forrige side"
        >
          <IconWrapper icon={arrowLongLeft} size="xs" />
        </PaginatorSelectorArrowBtn>
        {showPaginationNumbers && <PaginatorNumbersAndDots />}
        <PaginatorSelectorArrowBtn
          visible={shouldHaveRightArrow()}
          aria-hidden={!shouldHaveRightArrow()}
          onClick={() => setSelectedPageNumber(selectedPageNumber + 1)}
          data-testid="selector-arrow-btn-right"
          aria-label="Neste side"
        >
          <IconWrapper icon={arrowLongRight} size="xs" />
        </PaginatorSelectorArrowBtn>
      </PaginatorSelectorArea>
    </Paginator>
  );
};

export default Pagination;
