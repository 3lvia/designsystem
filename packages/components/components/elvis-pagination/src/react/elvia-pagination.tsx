import React, { FC, useState, useEffect, useMemo, useRef } from 'react';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import {
  PaginationLabel,
  PaginationProps,
  defaultPaginationValue,
  defaultPaginationDropdownItems,
  defaultPaginationLabelOptions,
} from './elvia-pagination.types';
import {
  Paginator,
  PaginatorInfoAmount,
  PaginatorInfoContainer,
  PaginatorInfoDropdown,
  PaginatorInfoText,
  PaginatorSelectorArea,
  PaginatorSelectorArrowBtn,
  CurrentDropdownOption,
} from './styledComponents';
import { useRovingFocus, warnDeprecatedProps, IconWrapper } from '@elvia/elvis-toolbox';
import arrowLongLeft from '@elvia/elvis-assets-icons/dist/icons/arrowLongLeft';
import arrowLongRight from '@elvia/elvis-assets-icons/dist/icons/arrowLongRight';
import { config } from './config';
import { PaginatorNumbersAndDots } from './PaginatorNumbersAndDots';
import { getPaginationRange } from './utilities';

const Pagination: FC<PaginationProps> = function ({
  // Value represents the current visible elements in the pagination
  value = defaultPaginationValue,
  numberOfElements = 0,
  lastNumberLimit,
  alignment = 'left',
  dropdownMenuPosition = 'bottom',
  dropdownItems = defaultPaginationDropdownItems,
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

  const isInitializedRef = useRef<boolean>(false);

  const [selectedPageNumber, setSelectedPageNumber] = useState(
    value.start ? Math.ceil(value.start / parseInt(dropdownItems[dropdownSelectedItemIndex].value)) : 1,
  );
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(
    parseInt(dropdownItems[dropdownSelectedItemIndex].value),
  );
  const previousDropdownValue = useRef(selectedDropdownValue);

  const currentDropdownOptionRef = useRef<HTMLSpanElement | null>(null);
  const [optimalDropdownWidth, setOptimalDropdownWidth] = useState(0);

  useEffect(() => {
    setOptimalDropdownWidth(currentDropdownOptionRef?.current?.offsetWidth ?? 0);
  }, [selectedDropdownValue, currentDropdownOptionRef]);

  const [showPaginationNumbers, setShowPaginationNumbers] = useState(true);
  /** Calculate number of pages based on total elements divided by amount of elements showing. */
  const [numberOfPages, setNumberOfPages] = useState(Math.ceil(numberOfElements / selectedDropdownValue));
  const [labelOptionsState, setLabelOptionsState] = useState<PaginationLabel>({
    ...defaultPaginationLabelOptions,
    ...labelOptions,
  });
  const { ref: listContainerRef } = useRovingFocus<HTMLElement>({ dir: 'horizontal' });

  const visibleElements = useMemo(
    () => getPaginationRange(selectedPageNumber, selectedDropdownValue, numberOfElements),
    [selectedPageNumber, selectedDropdownValue, numberOfElements],
  );

  useEffect(() => {
    // Set page number corresponding to value.start
    if (value.start === undefined || value.end === undefined) {
      setSelectedPageNumber(1);
      return;
    }
    const pageNumber = value.start === 0 ? 1 : Math.ceil(value.start / selectedDropdownValue);
    setSelectedPageNumber(pageNumber);
  }, [value]);

  /** If selectedDropdownValue is not a number, hide the pagination TODO: Varsle bruker? */
  useEffect(() => {
    if (isNaN(selectedDropdownValue)) {
      setNumberOfPages(0);
      setShowPaginationNumbers(false);
    }
  }, [selectedDropdownValue]);

  /** Keep labelOptions prop in sync with the shown label options */
  useEffect(() => {
    setLabelOptionsState({ ...defaultPaginationLabelOptions, ...labelOptions });
  }, [labelOptions]);

  /** Handle updating the selected range when changing the dropdown */
  useEffect(() => {
    updateVisibleElementsForDropdownChange();
  }, [selectedDropdownValue]);

  useEffect(() => {
    emitValueOnChangeEvent();
  }, [visibleElements]);

  useEffect(() => {
    setNumberOfPages(Math.ceil(numberOfElements / selectedDropdownValue));
    const allElementsShowing =
      numberOfElements > 0 && Math.ceil(numberOfElements / selectedDropdownValue) < 2;
    setShowPaginationNumbers(!allElementsShowing);
  }, [numberOfElements, selectedDropdownValue]);

  useEffect(() => {
    setSelectedDropdownValue(parseInt(dropdownItems[dropdownSelectedItemIndex].value));
  }, [dropdownItems, dropdownSelectedItemIndex]);

  useEffect(() => {
    isInitializedRef.current = true;
  }, []);

  const emitValueOnChangeEvent = (): void => {
    if (
      isInitializedRef.current === false ||
      visibleElements.start === undefined ||
      visibleElements.end === undefined ||
      visibleElements.start > numberOfElements
    ) {
      return;
    }
    valueOnChange?.(visibleElements);
    webcomponent?.setProps({ value: visibleElements }, true);
    webcomponent?.triggerEvent('valueOnChange', visibleElements);
  };

  const updateVisibleElementsForDropdownChange = (): void => {
    setSelectedPageNumber((previousPageNumber) => {
      const previousPaginationRange = getPaginationRange(
        previousPageNumber,
        previousDropdownValue.current,
        numberOfElements,
      );
      if (previousPaginationRange.start === undefined) {
        return previousPageNumber;
      }
      const firstElementIndex =
        Math.floor((previousPaginationRange.start - 1) / selectedDropdownValue) * selectedDropdownValue + 1;
      return Math.ceil(firstElementIndex / selectedDropdownValue);
    });
  };

  const shouldHaveLeftArrow = (): boolean => {
    return showPaginationNumbers && selectedPageNumber > 1;
  };
  const shouldHaveRightArrow = (): boolean => {
    return showPaginationNumbers && selectedPageNumber < numberOfPages;
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
    setSelectedDropdownValue((previousValue) => {
      previousDropdownValue.current = previousValue;
      return parseInt(newSelectedDropdownValue);
    });

    const selectedIndex = dropdownItems.findIndex((item) => item.value === newSelectedDropdownValue);
    dropdownSelectedItemIndexOnChange?.(selectedIndex);
    webcomponent?.setProps({ dropdownSelectedItemIndex: selectedIndex }, true);
    webcomponent?.triggerEvent('dropdownSelectedItemIndexOnChange', selectedIndex);
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
        <CurrentDropdownOption ref={currentDropdownOptionRef}>
          {selectedDropdownValue.toString()}
        </CurrentDropdownOption>
        <PaginatorInfoDropdown optimalWidth={optimalDropdownWidth}>
          <Dropdown
            isCompact
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
      {showPaginationNumbers && (
        <PaginatorSelectorArea role="navigation" ref={listContainerRef} data-testid="selector-area">
          <PaginatorSelectorArrowBtn
            visible={shouldHaveLeftArrow()}
            aria-hidden={!shouldHaveLeftArrow()}
            onClick={() => setSelectedPageNumber((previousPageNumber) => previousPageNumber - 1)}
            data-testid="selector-arrow-btn-left"
            aria-label="Forrige side"
          >
            <IconWrapper icon={arrowLongLeft} size="xs" />
          </PaginatorSelectorArrowBtn>

          <PaginatorNumbersAndDots
            numberOfPages={numberOfPages}
            selectedPageNumber={selectedPageNumber}
            setSelectedPageNumber={setSelectedPageNumber}
            numberOfElements={numberOfElements}
            lastNumberLimit={lastNumberLimit}
          />
          <PaginatorSelectorArrowBtn
            visible={shouldHaveRightArrow()}
            aria-hidden={!shouldHaveRightArrow()}
            onClick={() => setSelectedPageNumber((previousPageNumber) => previousPageNumber + 1)}
            data-testid="selector-arrow-btn-right"
            aria-label="Neste side"
          >
            <IconWrapper icon={arrowLongRight} size="xs" />
          </PaginatorSelectorArrowBtn>
        </PaginatorSelectorArea>
      )}
    </Paginator>
  );
};

export default Pagination;
