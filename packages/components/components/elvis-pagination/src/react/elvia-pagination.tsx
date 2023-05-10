import React, { FC, useState, useEffect } from 'react';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import {
  PaginationLabel,
  PaginationProps,
  defaultPaginationValue,
  defaultPaginationDropdownItems,
  defaultPaginationLabelOptions,
  VisibleElements,
} from './elvia-pagination.types';
import {
  Paginator,
  PaginatorInfoAmount,
  PaginatorInfoContainer,
  PaginatorInfoDropdown,
  PaginatorInfoText,
  PaginatorSelectorArea,
  PaginatorSelectorArrowBtn,
} from './styledComponents';
import { useRovingFocus, warnDeprecatedProps, IconWrapper } from '@elvia/elvis-toolbox';
import arrowLongLeft from '@elvia/elvis-assets-icons/dist/icons/arrowLongLeft';
import arrowLongRight from '@elvia/elvis-assets-icons/dist/icons/arrowLongRight';
import { config } from './config';
import { PaginatorNumbersAndDots } from './PaginatorNumbersAndDots';
import { usePagination } from 'react-use-pagination';

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
  const [numberOfElementsState, setNumberOfElementsState] = useState<number>(numberOfElements);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(
    parseInt(dropdownItems[dropdownSelectedItemIndex].value),
  );
  const initialPage = value.start
    ? Math.ceil(value.start / parseInt(dropdownItems[dropdownSelectedItemIndex].value))
    : 0;

  const {
    currentPage,
    totalPages,
    nextEnabled,
    pageSize,
    previousEnabled,
    startIndex,
    setPage,
    setPageSize,
  } = usePagination({
    totalItems: numberOfElementsState,
    initialPage: initialPage,
    initialPageSize: selectedDropdownValue,
  });

  useEffect(() => {
    setNumberOfElementsState(numberOfElements);
  }, [numberOfElements]);

  useEffect(() => {
    if (selectedDropdownValue === pageSize) {
      return;
    }
    const nextPage = Math.ceil((startIndex + 1) / selectedDropdownValue) - 1;
    setPageSize(selectedDropdownValue, nextPage);
  }, [selectedDropdownValue]);

  const [showPaginationNumbers, setShowPaginationNumbers] = useState(true);

  const [labelOptionsState, setLabelOptionsState] = useState<PaginationLabel>({
    ...defaultPaginationLabelOptions,
    ...labelOptions,
  });

  const { ref: listContainerRef } = useRovingFocus<HTMLElement>({ dir: 'horizontal' });

  useEffect(() => {
    if (value.start === undefined || value.end === undefined || value.start === 0) {
      setPage(0);
      console.log(
        'value useEffect: value.start === undefined || value.end === undefined || value.start === 0',
      );
      return;
    }

    setPage(Math.ceil(value.start / pageSize) - 1);
    console.log('value useEffect: ', value);
    console.log(Math.ceil(value.start / pageSize));
  }, [value]);

  /** If selectedDropdownValue is not a number, hide the pagination */
  useEffect(() => {
    if (isNaN(selectedDropdownValue)) {
      console.error(`elvis-pagination: the dropdown (${selectedDropdownValue}) value is not a number.`);
      setShowPaginationNumbers(false);
    }
  }, [selectedDropdownValue]);

  /** Keep labelOptions prop in sync with the shown label options */
  useEffect(() => {
    setLabelOptionsState({ ...defaultPaginationLabelOptions, ...labelOptions });
  }, [labelOptions]);

  useEffect(() => {
    const allElementsShowing =
      numberOfElements > 0 && Math.ceil(numberOfElements / selectedDropdownValue) < 2;
    setShowPaginationNumbers(!allElementsShowing);
  }, [numberOfElements, selectedDropdownValue]);

  useEffect(() => {
    setSelectedDropdownValue(parseInt(dropdownItems[dropdownSelectedItemIndex].value));
  }, [dropdownItems, dropdownSelectedItemIndex]);

  const emitValueOnChangeEvent = (valueToEmit: VisibleElements): void => {
    if (
      valueToEmit.start === undefined ||
      valueToEmit.end === undefined ||
      valueToEmit.start > numberOfElementsState
    ) {
      return;
    }
    valueOnChange?.(valueToEmit);
    webcomponent?.setProps({ value: valueToEmit }, true);
    webcomponent?.triggerEvent('valueOnChange', valueToEmit);
  };
  /** -- DROPDOWN -- */
  /** Dropdown item is not valid if the value is not a number */
  const isValidDropdownItem = (dropdownItem: string): boolean => {
    return !isNaN(parseInt(dropdownItem));
  };

  /** Update pagination values and dispatch dropdownSelectedItemIndex events */
  const handleDropdownValueChange = (incomingSelectedDropdownValue: string): void => {
    const newSelectedDropdownValue = parseInt(incomingSelectedDropdownValue);

    // Don't update or dispatch new event if the value is identical to previous value.
    if (newSelectedDropdownValue === selectedDropdownValue) {
      return;
    }
    if (!isValidDropdownItem(incomingSelectedDropdownValue)) {
      setShowPaginationNumbers(false);
      return;
    }
    if (!showPaginationNumbers) {
      setShowPaginationNumbers(true);
    }

    setSelectedDropdownValue(newSelectedDropdownValue);

    //emit indexes
    const nextPage = Math.ceil((startIndex + 1) / newSelectedDropdownValue) - 1;
    const start = getStartIndex(newSelectedDropdownValue, nextPage);
    const end = getEndIndex(newSelectedDropdownValue, nextPage, numberOfElementsState);
    emitValueOnChangeEvent({ start: start, end: end });

    //emit dropdownSelectedItemIndex
    const selectedIndex = dropdownItems.findIndex((item) => item.value === incomingSelectedDropdownValue);
    dropdownSelectedItemIndexOnChange?.(selectedIndex);
    webcomponent?.setProps({ dropdownSelectedItemIndex: selectedIndex }, true);
    webcomponent?.triggerEvent('dropdownSelectedItemIndexOnChange', selectedIndex);
  };

  const getEndIndex = (pageSize: number, currentPage: number, totalItems: number): number => {
    const lastPageEndIndex = pageSize * (currentPage + 1);

    if (lastPageEndIndex > totalItems) {
      return totalItems;
    }

    return lastPageEndIndex;
  };

  const getStartIndex = (pageSize: number, currentPage: number): number => {
    return pageSize * currentPage + 1;
  };

  const handleOnPageClick = (page: number): void => {
    if (page === currentPage) {
      return;
    }

    const start = getStartIndex(pageSize, page);
    const end = getEndIndex(pageSize, page, numberOfElementsState);
    emitValueOnChangeEvent({ start: start, end: end });
    setPage(page);
  };

  const handleOnPreviousPageClick = (): void => {
    handleOnPageClick(currentPage - 1);
  };

  const handleOnNextPageClick = (): void => {
    handleOnPageClick(currentPage + 1);
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
            visible={previousEnabled}
            aria-hidden={!previousEnabled}
            onClick={handleOnPreviousPageClick}
            data-testid="selector-arrow-btn-left"
            aria-label="Forrige side"
          >
            <IconWrapper icon={arrowLongLeft} size="xs" />
          </PaginatorSelectorArrowBtn>

          <PaginatorNumbersAndDots
            numberOfPages={totalPages}
            selectedPageNumber={currentPage + 1}
            setSelectedPageNumber={(p) => handleOnPageClick(p - 1)}
            numberOfElements={numberOfElements}
            lastNumberLimit={lastNumberLimit}
          />
          <PaginatorSelectorArrowBtn
            visible={nextEnabled}
            aria-hidden={!nextEnabled}
            onClick={handleOnNextPageClick}
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
