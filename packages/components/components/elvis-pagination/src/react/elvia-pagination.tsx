import arrowLongLeft from '@elvia/elvis-assets-icons/dist/icons/arrowLongLeft';
import arrowLongRight from '@elvia/elvis-assets-icons/dist/icons/arrowLongRight';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import { IconWrapper, useLanguage, useRovingFocus } from '@elvia/elvis-toolbox';
import React, { FC, useEffect, useState } from 'react';

import { PaginatorNumbersAndDots } from './PaginatorNumbersAndDots';
import {
  PaginationProps,
  VisibleElements,
  defaultPaginationDropdownItems,
  defaultPaginationValue,
} from './elvia-pagination.types';
import { getDefaultPaginationLabelOptions } from './labelUtilities';
import {
  Paginator,
  PaginatorInfoAmount,
  PaginatorInfoContainer,
  PaginatorInfoDropdown,
  PaginatorInfoText,
  PaginatorSelectorArea,
  PaginatorSelectorArrowBtn,
} from './styledComponents';

export const Pagination: FC<PaginationProps> = function ({
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
  const [selectedDropdownItemIndex, setSelectedDropdownItemIndex] = useState(dropdownSelectedItemIndex);
  const selectedDropdownValue = dropdownItems[selectedDropdownItemIndex].value;
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(parseInt(selectedDropdownValue));

  const totalPages = Math.ceil(numberOfElements / pageSize);
  const nextEnabled = currentPage < totalPages - 1;
  const previousEnabled = currentPage > 0;

  const lang = useLanguage();
  const [labelOptionsState, setLabelOptionsState] = useState(getDefaultPaginationLabelOptions(lang));
  const [ariaLabel, setAriaLabel] = useState('');

  const { ref: listContainerRef } = useRovingFocus<HTMLElement>({ dir: 'horizontal' });

  useEffect(() => {
    // Clamp current page to valid range when number of elements changes
    const totalPages = Math.floor(numberOfElements / pageSize);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [numberOfElements, pageSize]);

  useEffect(() => {
    setSelectedDropdownItemIndex(dropdownSelectedItemIndex);

    const newPageSize = parseInt(dropdownItems[dropdownSelectedItemIndex].value);
    setPageSize(newPageSize);

    const currentStartIndex = currentPage * pageSize;
    const newPageIndex = Math.floor(currentStartIndex / newPageSize);
    setCurrentPage(newPageIndex);
  }, [dropdownSelectedItemIndex]);

  useEffect(() => {
    if (value.start && value.end) {
      const pageSize = value.end - value.start + 1;
      setCurrentPage(Math.floor(value.start / pageSize));
    }
  }, [value]);

  // Toggle language for aria-label
  useEffect(() => {
    const newLabelOptions = getDefaultPaginationLabelOptions(lang, labelOptions);
    setLabelOptionsState(newLabelOptions);

    const label = newLabelOptions.label;

    const langLabel =
      lang === 'no'
        ? `viser ${selectedDropdownValue} ${label} per side`
        : `showing ${selectedDropdownValue} ${label} per page`;

    setAriaLabel(langLabel);
  }, [lang, selectedDropdownValue, labelOptionsState.label]);

  const showPaginationNumbers = (): boolean => {
    const allDropdownValuesAreNumbers = dropdownItems
      .map((item) => item.value)
      .every((value) => !isNaN(+value));

    const allElementsShowing =
      numberOfElements > 0 && Math.ceil(numberOfElements / parseInt(selectedDropdownValue)) < 2;

    return !allElementsShowing && allDropdownValuesAreNumbers;
  };

  const getPaginationValue = (pageIndex: number, elementsPerPage: number): VisibleElements => {
    const start = pageIndex * elementsPerPage;
    const end = start + elementsPerPage;
    // +1 to make it 1-indexed
    return { start: start + 1, end: Math.min(end, numberOfElements) };
  };

  const emitValueOnChangeEvent = (value: VisibleElements): void => {
    if (value.start != null && value.end != null && value.start <= numberOfElements) {
      valueOnChange?.(value);
      webcomponent?.setProps({ value: value }, true);
      webcomponent?.triggerEvent('valueOnChange', value);
    }
  };

  /** Update pagination values and dispatch dropdownSelectedItemIndex events */
  const handleDropdownValueChange = (incomingSelectedDropdownValue: string): void => {
    const newSelectedDropdownValue = parseInt(incomingSelectedDropdownValue);

    // Don't update or dispatch new event if the value is identical to previous value.
    if (newSelectedDropdownValue === parseInt(selectedDropdownValue)) {
      return;
    }

    const newIndex = dropdownItems.map((item) => item.value).indexOf(incomingSelectedDropdownValue);
    setSelectedDropdownItemIndex(newIndex);

    const currentStartIndex = currentPage * pageSize;
    const newPageIndex = Math.floor(currentStartIndex / newSelectedDropdownValue);
    setCurrentPage(newPageIndex);

    setPageSize(newSelectedDropdownValue);

    //emit dropdownSelectedItemIndex
    dropdownSelectedItemIndexOnChange?.(newIndex);
    webcomponent?.setProps({ dropdownSelectedItemIndex: newIndex }, true);
    webcomponent?.triggerEvent('dropdownSelectedItemIndexOnChange', newIndex);

    //emit indexes
    emitValueOnChangeEvent(getPaginationValue(newPageIndex, newSelectedDropdownValue));
  };

  const handleOnPageClick = (pageIndex: number): void => {
    if (pageIndex === currentPage) {
      return;
    }

    emitValueOnChangeEvent(getPaginationValue(pageIndex, pageSize));
    setCurrentPage(pageIndex);
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
      className={className}
      style={inlineStyle}
      data-testid="pagination"
      {...rest}
    >
      <PaginatorInfoContainer>
        <PaginatorInfoText>{labelOptionsState.displaying}</PaginatorInfoText>
        <PaginatorInfoDropdown>
          <Dropdown
            size="small"
            items={dropdownItems}
            menuPosition={dropdownMenuPosition}
            className="number-of-items-dropdown"
            value={selectedDropdownValue}
            valueOnChange={(event: string) => handleDropdownValueChange(event)}
            ariaLabel={ariaLabel}
          />
        </PaginatorInfoDropdown>
        <PaginatorInfoAmount>
          {labelOptionsState.of} {numberOfElements.toLocaleString('nb-NO')} {labelOptionsState.label}
        </PaginatorInfoAmount>
      </PaginatorInfoContainer>
      {showPaginationNumbers() && (
        <PaginatorSelectorArea ref={listContainerRef}>
          <PaginatorSelectorArrowBtn
            aria-hidden={!previousEnabled}
            aria-label={lang === 'no' ? 'Forrige side' : 'Previous page'}
            onClick={handleOnPreviousPageClick}
            type="button"
            visible={previousEnabled}
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
            aria-hidden={!nextEnabled}
            aria-label={lang === 'no' ? 'Neste side' : 'Next page'}
            onClick={handleOnNextPageClick}
            type="button"
            visible={nextEnabled}
          >
            <IconWrapper icon={arrowLongRight} size="xs" />
          </PaginatorSelectorArrowBtn>
        </PaginatorSelectorArea>
      )}
    </Paginator>
  );
};

export default Pagination;
