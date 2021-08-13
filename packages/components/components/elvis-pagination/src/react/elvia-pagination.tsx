import React, { FC, useState, useEffect } from 'react';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import * as StyledPaginator from './styledComponents';

export interface DropdownOption {
  value: string;
  label: string;
}

export interface SelectionNumber {
  start: number;
  end: number;
}

export interface PaginationProps {
  value: SelectionNumber;
  items: number;
  isRightAligned?: boolean;
  dropdownMenuPos: string;
  paginatorDropdownOptions: Array<DropdownOption>;
  labelDisplaying: string;
  label: string;
  labelOf: string;
  valueOnChange?: (value: SelectionNumber) => void;
  webcomponent?: any;
}

export const paginationOptions = [
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

const Pagination: FC<PaginationProps> = ({
  value = { start: undefined, end: undefined },
  items = 0,
  isRightAligned = false,
  dropdownMenuPos = 'bottom',
  paginatorDropdownOptions = paginationOptions,
  label = 'elements',
  labelDisplaying = 'Show',
  labelOf = 'of',
  valueOnChange,
  webcomponent,
}) => {
  const [currentDisplayAmount, setCurrentDisplayAmount] = useState(paginatorDropdownOptions[0]);
  const [showPaginationMenu, setShowPaginationMenu] = useState(true);
  const [currentValue, setvCurrentValue] = useState(value);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedNumber, setSelectedNumber] = useState(1);

  useEffect(() => {
    updateValue(selectedNumber);
  }, [selectedNumber, currentDisplayAmount]);

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
  let selectorAmount = Math.ceil(items / parseInt(currentDisplayAmount.value));
  if (isNaN(parseInt(currentDisplayAmount.value))) {
    selectorAmount = 0;
    setShowPaginationMenu(false);
  }
  // create array from numbers
  const selectionNumbers = Array.from(Array(selectorAmount + 1).keys()).slice(1);

  const activeNumber = (chosenNumber: number) => {
    return selectedNumber === chosenNumber;
  };
  // update selected number on arrow click
  const updateSelectedPageLeft = () => {
    setSelectedNumber((preSelectedNumn) => preSelectedNumn - 1);
  };
  const updateSelectedPageRight = () => {
    setSelectedNumber((preSelectedNumn) => preSelectedNumn + 1);
  };

  const isLeftArrow = () => {
    if (showPaginationMenu) {
      return selectedNumber > 1;
    }
    return false;
  };
  const isRightArrow = () => {
    if (showPaginationMenu) {
      return selectedNumber < selectionNumbers.length;
    }
    return false;
  };

  // Visible numbers in paginator
  const Paginators = () => {
    const visibleNumbers = [];
    const isShowAll = false;
    const isMobile = windowWidth < 768;

    // helper functions to determine what numbers get added to visible array
    const getNumbersWhenSelectedBetween1and5 = (selectionNumber: number) => {
      return selectionNumber === 1 || selectionNumber < 5;
    };

    const centerNumbersWhenBetween1And5 = (
      NumberInArray: number,
      SelectionArrayLenght: number,
      mobile: boolean,
      indexNumber: number,
    ) => {
      if (NumberInArray > 1 && NumberInArray <= 6 && NumberInArray !== SelectionArrayLenght && !mobile) {
        return (
          <StyledPaginator.PaginatorNumber
            selected={activeNumber(NumberInArray)}
            key={indexNumber}
            onClick={() => setSelectedNumber(NumberInArray)}
          >
            {NumberInArray}
          </StyledPaginator.PaginatorNumber>
        );
      } else if (
        NumberInArray > 1 &&
        NumberInArray <= 4 &&
        NumberInArray !== SelectionArrayLenght &&
        mobile
      ) {
        return (
          <StyledPaginator.PaginatorNumber
            selected={activeNumber(NumberInArray)}
            key={indexNumber}
            onClick={() => setSelectedNumber(NumberInArray)}
          >
            {NumberInArray}
          </StyledPaginator.PaginatorNumber>
        );
      }
    };
    const centerNumbersWhenLeast4OrHigher = (
      NumberInArray: number,
      SelectionArrayLenght: number,
      mobile: boolean,
      indexNumber: number,
    ) => {
      if (
        NumberInArray >= selectedNumber - 2 &&
        NumberInArray <= selectedNumber + 2 &&
        NumberInArray !== SelectionArrayLenght &&
        NumberInArray !== 1 &&
        !mobile
      ) {
        return (
          <StyledPaginator.PaginatorNumber
            selected={activeNumber(NumberInArray)}
            key={indexNumber}
            onClick={() => setSelectedNumber(NumberInArray)}
          >
            {NumberInArray}
          </StyledPaginator.PaginatorNumber>
        );
      } else if (
        NumberInArray >= selectedNumber - 1 &&
        NumberInArray <= selectedNumber + 1 &&
        NumberInArray !== SelectionArrayLenght &&
        NumberInArray !== 1 &&
        mobile
      ) {
        return (
          <StyledPaginator.PaginatorNumber
            selected={activeNumber(NumberInArray)}
            key={indexNumber}
            onClick={() => setSelectedNumber(NumberInArray)}
          >
            {NumberInArray}
          </StyledPaginator.PaginatorNumber>
        );
      }
    };

    const isSelectedNumberNearEnd = (selectionNumber: number) => {
      return selectionNumber >= selectionNumbers.length - 2;
    };

    const getNumbersWhenInProximityOfLastNumber = (
      NumberInArray: number,
      SelectionArrayLenght: number,
      mobile: boolean,
      indexNumber: number,
    ) => {
      if (
        NumberInArray >= SelectionArrayLenght - 5 &&
        NumberInArray !== SelectionArrayLenght &&
        NumberInArray !== 1 &&
        !mobile
      ) {
        return (
          <StyledPaginator.PaginatorNumber
            selected={activeNumber(NumberInArray)}
            key={indexNumber}
            onClick={() => setSelectedNumber(NumberInArray)}
          >
            {NumberInArray}
          </StyledPaginator.PaginatorNumber>
        );
      } else if (
        NumberInArray >= SelectionArrayLenght - 3 &&
        NumberInArray !== SelectionArrayLenght &&
        NumberInArray !== 1 &&
        mobile
      ) {
        return (
          <StyledPaginator.PaginatorNumber
            selected={activeNumber(NumberInArray)}
            key={indexNumber}
            onClick={() => setSelectedNumber(NumberInArray)}
          >
            {NumberInArray}
          </StyledPaginator.PaginatorNumber>
        );
      }
    };

    // funtions that return jsx elements in form of visible numbers to the selectorArray
    const getFirstNumber = () => {
      return (
        <StyledPaginator.PaginatorNumber
          selected={activeNumber(1)}
          isFirst={true}
          key={'firstPaginationNumb'}
          onClick={() => setSelectedNumber(1)}
        >
          {1}
        </StyledPaginator.PaginatorNumber>
      );
    };
    const getFirstDots = () => {
      if (selectedNumber >= 5 && selectionNumbers.length >= 8 && !isMobile) {
        return <StyledPaginator.PaginatorDots key={'firstDots'}>...</StyledPaginator.PaginatorDots>;
      } else if (selectedNumber >= 4 && selectionNumbers.length >= 5 && isMobile) {
        return <StyledPaginator.PaginatorDots key={'firstDotsMobile'}>...</StyledPaginator.PaginatorDots>;
      } else {
        return null;
      }
    };
    const getCenterNumbers = () => {
      // Initiate when selected number is 1 or below 5

      if (getNumbersWhenSelectedBetween1and5(selectedNumber)) {
        return selectionNumbers.map((number, index) => {
          return centerNumbersWhenBetween1And5(number, selectionNumbers.length, isMobile, index);
        });
      }
      // if currentSelection is at least 4 or higher
      if (selectedNumber >= 4 && selectedNumber < selectionNumbers.length - 2) {
        return selectionNumbers.map((number, index) => {
          // if selected numbers is 2+/- away from first or last selectable number
          return centerNumbersWhenLeast4OrHigher(number, selectionNumbers.length, isMobile, index);
        });
      }
      // If selected number is i proximity of last selectable number
      if (isSelectedNumberNearEnd(selectedNumber)) {
        return selectionNumbers.map((number, index) => {
          return getNumbersWhenInProximityOfLastNumber(number, selectionNumbers.length, isMobile, index);
        });
      }
    };
    const getLastDots = () => {
      if (selectedNumber < selectionNumbers.length - 3 && selectionNumbers.length > 7 && !isMobile) {
        return <div key={'lastDots'}>...</div>;
      } else if (selectedNumber < selectionNumbers.length - 3 && selectionNumbers.length > 5 && isMobile) {
        return <div key={'lastDotsMobile'}>...</div>;
      } else {
        return null;
      }
    };
    const getLastNumber = () => {
      return (
        <StyledPaginator.PaginatorNumber
          selected={activeNumber(selectionNumbers.length)}
          isLast={true}
          key={'lastPaginationNumb'}
          onClick={() => setSelectedNumber(selectionNumbers.length)}
        >
          {selectionNumbers.length}
        </StyledPaginator.PaginatorNumber>
      );
    };

    // get visible numbers
    if (!isShowAll) {
      const firstNumbers = getFirstNumber();
      const firstDots = getFirstDots();
      const centerNumbers = getCenterNumbers();
      const lastDots = getLastDots();
      const lastNumbers = getLastNumber();
      visibleNumbers.push(firstNumbers, firstDots, centerNumbers, lastDots, lastNumbers);
    }
    return visibleNumbers;
  };

  const onDropdownChangeHandler = (selectionRange: DropdownOption) => {
    if (isNaN(parseInt(selectionRange.value)) || items === 0) {
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
      endRange = items;
    }

    const newValue = { start: startRange, end: endRange };
    setvCurrentValue(newValue);

    if (!webcomponent && valueOnChange) {
      valueOnChange(newValue);
    } else if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: newValue }, true);
    }
  };

  const valueRangeToSelectedNumber = (value: SelectionNumber) => {
    if (value.start != undefined || value.end != undefined) {
      const currentDropdownDisplayVal = parseInt(currentDisplayAmount.value);
      const endNum = value.end;
      setSelectedNumber(Math.ceil(endNum / currentDropdownDisplayVal));
    }
  };

  // set rangevalue and return in valueOnChange function
  useEffect(() => {
    if (currentValue.start === undefined || currentValue.end === undefined) {
      updateValue(selectedNumber);
    }
    if (value.start != undefined || value.end != undefined) {
      valueRangeToSelectedNumber(value);
    }
  }, [value]);

  return (
    <StyledPaginator.Pagination isRightAligned={isRightAligned}>
      <StyledPaginator.InfoContainer>
        <StyledPaginator.InfoText>{labelDisplaying}</StyledPaginator.InfoText>
        <StyledPaginator.InfoDropdown>
          <Dropdown
            isCompact
            placeholder=""
            options={paginatorDropdownOptions}
            menuPosition={dropdownMenuPos}
            defaultValue={currentDisplayAmount}
            valueOnChange={(event: any) => onDropdownChangeHandler(event)}
          ></Dropdown>
        </StyledPaginator.InfoDropdown>
        <StyledPaginator.InfoAmount isMobile={windowWidth < 768}>
          {labelOf} {items} {label}
        </StyledPaginator.InfoAmount>
      </StyledPaginator.InfoContainer>

      <StyledPaginator.SelectorArea>
        <StyledPaginator.SelectorArrowBtn visible={isLeftArrow()} onClick={updateSelectedPageLeft}>
          <StyledPaginator.SelectorArrowLeft />
        </StyledPaginator.SelectorArrowBtn>

        {showPaginationMenu ? <Paginators /> : null}

        <StyledPaginator.SelectorArrowBtn visible={isRightArrow()} onClick={updateSelectedPageRight}>
          <StyledPaginator.SelectorRighArrow />
        </StyledPaginator.SelectorArrowBtn>
      </StyledPaginator.SelectorArea>
    </StyledPaginator.Pagination>
  );
};

export default Pagination;
