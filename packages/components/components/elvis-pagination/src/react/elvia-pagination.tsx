import React, { FC, useState, useEffect } from 'react';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import {
  VisibleElements,
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
} from './styledComponents';
import { useRovingFocus, warnDeprecatedProps, IconWrapper } from '@elvia/elvis-toolbox';
import arrowLongLeft from '@elvia/elvis-assets-icons/dist/icons/arrowLongLeft';
import arrowLongRight from '@elvia/elvis-assets-icons/dist/icons/arrowLongRight';
import { config } from './config';
import { PaginatorNumbersAndDots } from './PaginatorNumbersAndDots';

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

  const [selectedPageNumber, setSelectedPageNumber] = useState(1);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(
    parseInt(dropdownItems[dropdownSelectedItemIndex].value),
  );
  const [showPaginationNumbers, setShowPaginationNumbers] = useState(true);
  /** Calculate number of pages based on total elements divided by amount of elements showing. */
  const [numberOfPages, setNumberOfPages] = useState(Math.ceil(numberOfElements / selectedDropdownValue));
  const [labelOptionsState, setLabelOptionsState] = useState<PaginationLabel>({
    ...defaultPaginationLabelOptions,
    ...labelOptions,
  });
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

  /** If the selected range is programmatically changed, update what page is selected */
  useEffect(() => {
    updateSelectedPageByVisibleElements();
  }, [visibleElements, numberOfPages]);

  /** Keep labelOptions prop in sync with the shown label options */
  useEffect(() => {
    setLabelOptionsState({ ...defaultPaginationLabelOptions, ...labelOptions });
  }, [labelOptions]);

  /** Handle updating the selected range when changing page number */
  useEffect(() => {
    if (numberOfElements !== 0) {
      updateVisibleElementsForSelectedPageNumberChange();
    }
  }, [selectedPageNumber]);

  /** Handle updating the selected range when changing the dropdown */
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

  const triggerValueOnChangeEvent = (): void => {
    if (visibleElements.start === undefined || visibleElements.end === undefined) {
      return;
    }
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
    const firstElementIndex = selectedDropdownValue * selectedPageNumber - selectedDropdownValue + 1;
    const lastElementIndex = Math.min(firstElementIndex + selectedDropdownValue - 1, numberOfElements);
    setVisibleElements({
      start: firstElementIndex,
      end: lastElementIndex,
    });
  };

  /** Update selected page when value (visible elements) changed */
  const updateSelectedPageByVisibleElements = (): void => {
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
    setSelectedDropdownValue(parseInt(newSelectedDropdownValue));

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
        {showPaginationNumbers && (
          <PaginatorNumbersAndDots
            numberOfPages={numberOfPages}
            selectedPageNumber={selectedPageNumber}
            setSelectedPageNumber={setSelectedPageNumber}
            numberOfElements={numberOfElements}
            lastNumberLimit={lastNumberLimit}
          />
        )}
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
