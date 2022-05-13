import React, { FC, useState, useEffect, CSSProperties } from 'react';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import { Icon } from '@elvia/elvis-icon/react';
import { DropdownOption, SelectionNumber, PaginationLabel } from './elvia-pagination.types';
import {
  Paginator,
  PaginatorNumber,
  PaginatorInfoAmount,
  PaginatorInfoContainer,
  PaginatorInfoDropdown,
  PaginatorInfoText,
  PaginatorDots,
  PaginatorNumbersArea,
  PaginatorSelectorArea,
  PaginatorSelectorArrowBtn,
} from './styledComponents';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';
import { warnDeprecatedProps } from '@elvia/elvis-toolbox';
import { config } from './config';

export interface PaginationProps {
  value: SelectionNumber;
  numberOfElements: number;
  lastNumberLimit?: number;
  alignment?: 'left' | 'right';
  dropdownItems: DropdownOption[];
  dropdownMenuPosition: string;
  dropdownSelectedItemIndex: number;
  dropdownSelectedItemIndexOnChange?: (value: number) => void;
  labelOptions?: PaginationLabel;
  valueOnChange?: (value: SelectionNumber) => void;
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

const defaultPaginationOptions: DropdownOption[] = [
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

const defaultPaginationLabel: PaginationLabel = {
  displaying: 'Viser',
  of: 'av',
  label: 'elementer',
};

const Pagination: FC<PaginationProps> = function ({
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
  // eslint-disable-next-line prefer-rest-params
  warnDeprecatedProps(config, arguments[0]);

  const [currentDisplayAmount, setCurrentDisplayAmount] = useState(dropdownItems[dropdownSelectedItemIndex]);
  const [showPaginationMenu, setShowPaginationMenu] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedNumber, setSelectedNumber] = useState(1);

  const [labelOptionsState, setLabelOptionsState] = useState<PaginationLabel>({
    ...defaultPaginationLabel,
    ...labelOptions,
  });
  useEffect(() => {
    setLabelOptionsState({ ...defaultPaginationLabel, ...labelOptions });
  }, [labelOptions]);

  useEffect(() => {
    updateValue(selectedNumber);
  }, [selectedNumber, currentDisplayAmount]);

  useEffect(() => {
    onDropdownChangeHandler(currentDisplayAmount);
  }, [numberOfElements]);

  useEffect(() => {
    setCurrentDisplayAmount(dropdownItems[dropdownSelectedItemIndex]);
  }, [dropdownItems, dropdownSelectedItemIndex]);

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

  // calculate amount of selection numbers, based on total pages
  let selectorAmount = Math.ceil(numberOfElements / parseInt(currentDisplayAmount.value));
  if (isNaN(parseInt(currentDisplayAmount.value))) {
    selectorAmount = 0;
    setShowPaginationMenu(false);
  }
  // create array from numbers
  const selectionNumbers = Array.from(Array(selectorAmount + 1).keys()).slice(1);

  const activeNumber = (chosenNumber: number): boolean => {
    return selectedNumber === chosenNumber;
  };
  // update selected number on arrow click
  const updateSelectedPageLeft = (): void => {
    setSelectedNumber((preSelectedNumn) => preSelectedNumn - 1);
  };
  const updateSelectedPageRight = (): void => {
    setSelectedNumber((preSelectedNumn) => preSelectedNumn + 1);
  };

  const isLeftArrow = (): boolean => {
    if (showPaginationMenu) {
      return selectedNumber > 1;
    }
    return false;
  };
  const isRightArrow = (): boolean => {
    if (showPaginationMenu) {
      return selectedNumber < selectionNumbers.length;
    }
    return false;
  };

  const getAriaLabel = (NumberInArray: number): string => {
    if (NumberInArray === selectedNumber) {
      return 'Valgt side';
    } else {
      return 'Velg side ' + NumberInArray;
    }
  };

  // Visible numbers in paginator
  const PaginatorNumbers = (): JSX.Element => {
    const visibleNumbers = [];
    const isShowAll = false;
    const isMobile = windowWidth < 768;

    const paginatorNumber = (NumberInArray: number, indexNumber: number) => {
      return [
        <PaginatorNumber
          isFirst={false}
          isLast={false}
          key={indexNumber}
          noShow={false}
          onClick={() => setSelectedNumber(NumberInArray)}
          selected={activeNumber(NumberInArray)}
          aria-label={getAriaLabel(NumberInArray)}
          aria-current={NumberInArray === selectedNumber}
        >
          {NumberInArray}
        </PaginatorNumber>,
      ];
    };

    // helper functions to determine what numbers get added to visible array
    const getNumbersWhenSelectedBetween1and5 = (selectionNumber: number): boolean => {
      return selectionNumber === 1 || selectionNumber < 5;
    };

    const centerNumbersWhenBetween1And5DisplayCheck = (
      numberInArray: number,
      SelectionArrayLenght: number,
      maxValue: number,
    ): boolean => {
      if (numberInArray > 1 && numberInArray <= maxValue && numberInArray !== SelectionArrayLenght) {
        return true;
      }
      return false;
    };

    const centerNumbersWhenBetween1And5 = (
      NumberInArray: number,
      SelectionArrayLenght: number,
      mobile: boolean,
      indexNumber: number,
    ) => {
      if (centerNumbersWhenBetween1And5DisplayCheck(NumberInArray, SelectionArrayLenght, 6) && !mobile) {
        return paginatorNumber(NumberInArray, indexNumber);
      } else if (
        centerNumbersWhenBetween1And5DisplayCheck(NumberInArray, SelectionArrayLenght, 4) &&
        mobile &&
        selectedNumber !== 4
      ) {
        return paginatorNumber(NumberInArray, indexNumber);
      } else if (
        mobile &&
        selectedNumber === 4 &&
        NumberInArray >= selectedNumber - 1 &&
        NumberInArray <= selectedNumber + 1 &&
        NumberInArray < 6
      ) {
        return paginatorNumber(NumberInArray, indexNumber);
      }
      return [];
    };

    const centerNumbersWhenLeast5OrHigherDisplayCheck = (
      numberInArray: number,
      SelectionArrayLenght: number,
      proximityRange: number,
    ): boolean => {
      if (
        numberInArray >= selectedNumber - proximityRange &&
        numberInArray <= selectedNumber + proximityRange &&
        numberInArray !== SelectionArrayLenght &&
        numberInArray !== 1
      ) {
        return true;
      }
      return false;
    };

    const centerNumbersWhenLeast5OrHigher = (
      NumberInArray: number,
      SelectionArrayLenght: number,
      mobile: boolean,
      indexNumber: number,
    ) => {
      if (centerNumbersWhenLeast5OrHigherDisplayCheck(NumberInArray, SelectionArrayLenght, 2) && !mobile) {
        return paginatorNumber(NumberInArray, indexNumber);
      } else if (
        centerNumbersWhenLeast5OrHigherDisplayCheck(NumberInArray, SelectionArrayLenght, 1) &&
        mobile
      ) {
        return paginatorNumber(NumberInArray, indexNumber);
      }
      return [];
    };

    const isSelectedNumberNearEnd = (selectionNumber: number) => {
      return selectionNumber >= selectionNumbers.length - 2;
    };

    const getNumbersWhenInProximityOfLastNumberDisplayCheck = (
      numberInArray: number,
      SelectionArrayLenght: number,
      proximityRange: number,
    ): boolean => {
      if (
        numberInArray >= SelectionArrayLenght - proximityRange &&
        numberInArray !== SelectionArrayLenght &&
        numberInArray !== 1
      ) {
        return true;
      }
      return false;
    };

    const getNumbersWhenInProximityOfLastNumber = (
      NumberInArray: number,
      SelectionArrayLenght: number,
      mobile: boolean,
      indexNumber: number,
    ) => {
      if (
        getNumbersWhenInProximityOfLastNumberDisplayCheck(NumberInArray, SelectionArrayLenght, 5) &&
        !mobile
      ) {
        return paginatorNumber(NumberInArray, indexNumber);
      } else if (
        getNumbersWhenInProximityOfLastNumberDisplayCheck(NumberInArray, SelectionArrayLenght, 3) &&
        mobile
      ) {
        return paginatorNumber(NumberInArray, indexNumber);
      }
      return [];
    };

    // functions that return jsx elements in form of visible numbers to the selectorArray
    const getFirstNumber = () => {
      return (
        <PaginatorNumber
          isFirst={true}
          isLast={false}
          key={'firstPaginationNumber'}
          noShow={false}
          onClick={() => setSelectedNumber(1)}
          selected={activeNumber(1)}
          aria-label={'Velg side ' + 1}
          aria-current={1 === selectedNumber}
        >
          {1}
        </PaginatorNumber>
      );
    };

    const getFirstDots = () => {
      let noDots = true;
      let key = 'noShowFirstDots';
      if (selectedNumber >= 5 && selectionNumbers.length >= 8 && !isMobile) {
        noDots = false;
        key = 'firstDots';
      } else if (selectedNumber >= 4 && selectionNumbers.length >= 5 && isMobile) {
        noDots = false;
        key = 'firstDotsMobile';
      }
      return (
        <PaginatorDots key={key} noDots={noDots}>
          ...
        </PaginatorDots>
      );
    };

    const getCenterNumbers = (): Array<any> => {
      // Initiate when selected number is 1 or below 5
      if (getNumbersWhenSelectedBetween1and5(selectedNumber)) {
        return selectionNumbers.map((number, index) => {
          return [centerNumbersWhenBetween1And5(number, selectionNumbers.length, isMobile, index)];
        });
      }
      // if currentSelection is at least 5 or higher
      if (selectedNumber >= 5 && selectedNumber < selectionNumbers.length - 2) {
        return selectionNumbers.map((number, index) => {
          // if selected numbers is 2+/- away from first or last selectable number
          return [centerNumbersWhenLeast5OrHigher(number, selectionNumbers.length, isMobile, index)];
        });
      }
      // If selected number is i proximity of last selectable number
      if (isSelectedNumberNearEnd(selectedNumber)) {
        return selectionNumbers.map((number, index) => {
          return [getNumbersWhenInProximityOfLastNumber(number, selectionNumbers.length, isMobile, index)];
        });
      }

      return [
        <PaginatorNumber
          isFirst={false}
          isLast={false}
          key={'noShowCenterumbers'}
          noShow={true}
          selected={false}
        ></PaginatorNumber>,
      ];
    };
    const getLastDots = () => {
      let noDots = true;
      let key = 'noShowLastDots';
      if (selectedNumber < selectionNumbers.length - 3 && selectionNumbers.length > 7 && !isMobile) {
        noDots = false;
        key = 'lastDots';
      } else if (selectedNumber < selectionNumbers.length - 3 && selectionNumbers.length > 5 && isMobile) {
        noDots = false;
        key = 'lastDotsMobile';
      }
      return (
        <PaginatorDots key={key} noDots={noDots}>
          ...
        </PaginatorDots>
      );
    };
    const getLastNumber = () => {
      if (numberOfElements <= parseInt(currentDisplayAmount.value)) {
        return null;
      }
      if (lastNumberLimit !== undefined) {
        if (lastNumberLimit <= numberOfElements && !(selectedNumber >= selectionNumbers.length - 3)) {
          return null;
        }
      }

      return (
        <PaginatorNumber
          isFirst={false}
          isLast={true}
          key={'lastPaginationNumber'}
          noShow={false}
          onClick={() => setSelectedNumber(selectionNumbers.length)}
          selected={activeNumber(selectionNumbers.length)}
          aria-label={'Velg side ' + selectionNumbers.length}
          aria-current={selectionNumbers.length === selectedNumber}
        >
          {selectionNumbers.length}
        </PaginatorNumber>
      );
    };

    // get visible numbers
    if (!isShowAll) {
      const firstNumbers = getFirstNumber();
      const firstDots = getFirstDots();
      const centerNumbers = getCenterNumbers();
      const lastDots = getLastDots();
      const lastNumbers = getLastNumber();
      visibleNumbers.push(firstNumbers, firstDots);
      centerNumbers.forEach((paginatorNumbers) => {
        if (paginatorNumbers.length != 0) {
          visibleNumbers.push(paginatorNumbers);
        }
      });
      visibleNumbers.push(lastDots, lastNumbers);
    }

    return <PaginatorNumbersArea>{visibleNumbers}</PaginatorNumbersArea>;
  };

  const onDropdownChangeHandler = (selectionRange: DropdownOption) => {
    if (isNaN(parseInt(selectionRange.value)) || numberOfElements === 0) {
      setShowPaginationMenu(false);
      return;
    }
    if (!showPaginationMenu) {
      setShowPaginationMenu(true);
    }
    setCurrentDisplayAmount(selectionRange);
    // Check if current selection number in avalailable selectionNumbers array
    const isSelectedInRange = selectionNumbers.includes(selectedNumber);
    if (!isSelectedInRange) {
      setSelectedNumber(selectionNumbers.length);
    }
    if (selectionRange !== currentDisplayAmount) {
      const selectedIndex = dropdownItems.indexOf(selectionRange);
      if (!webcomponent && dropdownSelectedItemIndexOnChange) {
        dropdownSelectedItemIndexOnChange(selectedIndex);
      } else if (webcomponent) {
        // True -> Prevents rerender
        webcomponent.setProps({ dropdownSelectedItemIndex: selectedIndex }, true);
      }
    }
  };

  // set rangevalue and return in valueOnChange function
  const updateValue = (value: number) => {
    if (!selectionNumbers.includes(value)) {
      return;
    }

    const startRange =
      parseInt(currentDisplayAmount.value) * value - parseInt(currentDisplayAmount.value) + 1;
    let endRange;
    endRange = startRange + parseInt(currentDisplayAmount.value) - 1;
    if (value === selectionNumbers.length) {
      endRange = numberOfElements;
    }

    const newValue = { start: startRange, end: endRange };

    if (!webcomponent && valueOnChange) {
      valueOnChange(newValue);
    } else if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: newValue }, true);
    }
  };

  const valueRangeToSelectedNumber = (value: SelectionNumber) => {
    if (value.start != undefined || value.end != undefined) {
      const valueGap = value.end - value.start + 1;

      if (numberOfElements === value.end) {
        setSelectedNumber(selectionNumbers.length);
      } else {
        setSelectedNumber(Math.ceil(value.end / valueGap));
      }
    }
  };

  // set rangevalue and return in valueOnChange function
  useEffect(() => {
    if (value.start != undefined || value.end != undefined) {
      valueRangeToSelectedNumber(value);
    }
  }, [value]);

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
            options={dropdownItems}
            menuPosition={dropdownMenuPosition}
            defaultValue={currentDisplayAmount}
            valueOnChange={(event: any) => onDropdownChangeHandler(event)}
            data-testid="dropdown"
          ></Dropdown>
        </PaginatorInfoDropdown>
        <PaginatorInfoAmount isMobile={windowWidth < 768} data-testid="info-amount">
          {labelOptionsState.of} {numberOfElements} {labelOptionsState.label}
        </PaginatorInfoAmount>
      </PaginatorInfoContainer>
      <PaginatorSelectorArea role="navigation">
        <PaginatorSelectorArrowBtn
          visible={isLeftArrow()}
          onClick={updateSelectedPageLeft}
          data-testid="selector-arrow-btn-left"
          aria-label="Forrige side"
        >
          <Icon name="arrowLongLeft" size="xs" />
        </PaginatorSelectorArrowBtn>
        {showPaginationMenu ? <PaginatorNumbers data-testid="paginators" /> : null}
        <PaginatorSelectorArrowBtn
          visible={isRightArrow()}
          onClick={updateSelectedPageRight}
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
